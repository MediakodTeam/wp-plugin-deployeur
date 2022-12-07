<?php

class Deployeur_Ajax {

	public function __construct() {
		add_action('wp_ajax_mkd_log_history', array($this, 'mkd_log_history'));
		add_action('wp_ajax_nopriv_mkd_log_history', array($this, 'mkd_log_history'));
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
			)
		);

		return wp_send_json_success();
	}
}
