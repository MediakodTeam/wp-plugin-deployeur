<?php

class Deployeur_Ajax {

	public function __construct() {
		add_action('wp_ajax_mkd_fetch_webhooks', array($this, 'mkd_fetch_webhooks'));
		add_action('wp_ajax_nopriv_mkd_fetch_webhooks', array($this, 'mkd_fetch_webhooks'));

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

		return wp_send_json_success(array('success' => true));
	}

	public function mkd_log_history() {
		if (!isset($_POST['status']) || !isset($_POST['webhooks'])) {
			return wp_send_json_error();
		}

		global $wpdb;

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
		if ($_POST['status'] == "success") {
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
