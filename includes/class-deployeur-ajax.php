<?php

class Deployeur_Ajax {

	public function __construct() {
		add_action('wp_ajax_mkd_log_history', array($this, 'mkd_log_history'));
		add_action('wp_ajax_nopriv_mkd_log_history', array($this, 'mkd_log_history'));

		add_action('wp_ajax_mkd_clear_history', array($this, 'mkd_clear_history'));
		add_action('wp_ajax_nopriv_mkd_clear_history', array($this, 'mkd_clear_history'));
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
