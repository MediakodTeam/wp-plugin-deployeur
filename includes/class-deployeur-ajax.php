<?php

class Deployeur_Ajax {

	public function __construct() {
		add_action('wp_ajax_mkd_fetch_webhooks', array($this, 'mkd_fetch_webhooks'));
		add_action('wp_ajax_nopriv_mkd_fetch_webhooks', array($this, 'mkd_fetch_webhooks'));

		add_action('wp_ajax_mkd_revalidate_path', array($this, 'mkd_revalidate_path'));
		add_action('wp_ajax_nopriv_mkd_revalidate_path', array($this, 'mkd_revalidate_path'));

		add_action('wp_ajax_mkd_log_history', array($this, 'mkd_log_history'));
		add_action('wp_ajax_nopriv_mkd_log_history', array($this, 'mkd_log_history'));

		add_action('wp_ajax_mkd_clear_history', array($this, 'mkd_clear_history'));
		add_action('wp_ajax_nopriv_mkd_clear_history', array($this, 'mkd_clear_history'));
	}

	public function mkd_fetch_webhooks() {

		if (!isset($_POST['webhooks'])) {
			return wp_send_json_error(array(
				'error' => 'Webhook URL is required',
			));
		}

		$webhook  = esc_url_raw($_POST['webhooks']);
		$method   = isset($_POST['method']) ? sanitize_text_field($_POST['method']) : 'POST';
		$body     = isset($_POST['body']) ? $_POST['body'] : array();

		$args = array(
			'method'  => $method,
			'headers' => array(
				'Content-Type' => 'application/json',
			),
			'body'    => !empty($body) ? wp_json_encode($body) : null,
			'timeout' => 20,
		);

		$response = wp_remote_request($webhook, $args);

		if (is_wp_error($response)) {
			return wp_send_json_error(array(
				'error' => 'Unknown error, please check your console',
				'details' => $response->get_error_message(),
			), 400);
		}

		$data = json_decode(wp_remote_retrieve_body($response), true);

		if (isset($data['error'])) {
			return wp_send_json_error($data, 400);
		}

		return wp_send_json_success(array('success' => true), 200);
	}

	public function mkd_revalidate_path() {
		if (!isset($_POST['webhooks'])) {
			return wp_send_json_error(array(
				'error' => 'Webhook URL is required',
			));
		}

		$webhook  = esc_url_raw($_POST['webhooks']);
		$body     = isset($_POST['body']) ? $_POST['body'] : array();
		$path = isset($_POST['path']) ? sanitize_text_field($_POST['path']) : '';

		$post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;

		$response = $this->revalide_path($webhook, $path);

		if (is_wp_error($response)) {
			return wp_send_json_error(array(
				'error' => 'Unknown error, please check your console',
				'details' => $response->get_error_message(),
			), 400);
		}

		$data = json_decode(wp_remote_retrieve_body($response), true);

		if (isset($data['error'])) {
			return wp_send_json_error($data, 400);
		}

		$front_url = get_home_url();

		// Now, we'll revalidate the path for archive and archive taxonomies if there's a post ID
		if ($post_id && $post_id > 0) {
			$post = get_post($post_id);

			if ($post && $post->post_type !== "page") {

				// Get the slug of the archive for the post type
				$archive_slug = get_post_type_archive_link($post->post_type);

				if ($archive_slug) {
					// Remove the URL from the archive slug
					$archive_slug = str_replace($front_url, '', $archive_slug);

					// Revalidate the archive path
					$this->revalide_path($webhook, $archive_slug);
				}

				// Get all taxonomies assigned to the post type
				$taxonomies = get_object_taxonomies($post->post_type, 'names');
				$taxonomies = array_filter($taxonomies, function ($taxonomy) {
					return !in_array($taxonomy, array('post_tag', 'category')); // Exclude default taxonomies
				});

				if ($post->post_type === 'post') {
					// Add the default category taxonomy if the post type is 'post'
					$taxonomies[] = 'category';
				}


				// Loop through each taxonomy and revalidate the archive path
				foreach ($taxonomies as $taxonomy) {
					// Get assigned terms for the post
					$terms = get_the_terms($post_id, $taxonomy);

					if ($terms && !is_wp_error($terms)) {
						foreach ($terms as $term) {
							// Get the term archive link
							$term_link = get_term_link($term, $taxonomy);

							if (!is_wp_error($term_link)) {
								// Remove the URL from the term link
								$term_link = str_replace($front_url, '', $term_link);

								// Revalidate the term path
								$this->revalide_path($webhook, $term_link);
							}
						}
					}
				}
			}
		}

		return wp_send_json_success(array('success' => true), 200);
	}

	public function revalide_path($webhook, $path) {
		if (empty($webhook) || empty($path)) {
			return false;
		}

		$args = array(
			'method'  => 'POST',
			'headers' => array(
				'Content-Type' => 'application/json',
			),
			'body'    => json_encode(array('path' => $path)),
			'timeout' => 20,
		);

		$response = wp_remote_request($webhook, $args);

		error_log(print_r("Revalidate path " . $path, true));

		return $response;
	}

	public function mkd_log_history() {
		if (!isset($_POST['status']) || !isset($_POST['webhooks'])) {
			return wp_send_json_error();
		}

		global $wpdb;

		$type = isset($_POST['type']) ? sanitize_text_field($_POST['type']) : 'deploy';

		$table_name = $wpdb->prefix . 'deployeur_history';

		$wpdb->insert(
			$table_name,
			array(
				'date' => current_time('mysql'),
				'user_id' => get_current_user_id(),
				'status' => $_POST['status'],
				'webhooks' => $_POST['webhooks'],
				'type' => isset($_POST['type']) ? sanitize_text_field($_POST['type']) : 'deploy',
				'update_count' => $_POST['status'] == "success" ? $this->get_count_of_update() : 0
			)
		);

		// Clean the update table
		if ($_POST['status'] == "success" && $type === "deploy") {
			$table_name = $wpdb->prefix . 'deployeur_update';

			$wpdb->query("TRUNCATE TABLE $table_name");
		}

		return wp_send_json_success();
	}

	public function mkd_clear_history() {
		global $wpdb;

		$table_name = $wpdb->prefix . 'deployeur_history';

		$wpdb->query("TRUNCATE TABLE $table_name");

		return wp_send_json_success();
	}

	public function get_count_of_update() {
		global $wpdb;

		$table_name = $wpdb->prefix . "deployeur_update";

		$count = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");

		return $count;
	}
}
