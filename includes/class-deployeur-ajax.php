<?php

class Deployeur_Ajax {

	public function __construct() {
		add_action('wp_ajax_mkd_log_history', array($this, 'mkd_log_history'));
		add_action('wp_ajax_nopriv_mkd_log_history', array($this, 'mkd_log_history'));
	}

	public function mkd_log_history() {
		error_log(print_r("Hello world", true));
	}
}
