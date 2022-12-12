<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      0.1.0
 *
 * @package    Deployeur
 * @subpackage Deployeur/includes
 */

class Deployeur_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    0.1.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'deployeur',
			false,
			dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
		);

		add_action('admin_init', array($this, 'insert_translations_key'));
	}

	/**
	 * Insert to admin a div element with a data attribute
	 * 
	 * @since 0.2.1
	 * 
	 */
	public function insert_translations_key() {

		$translations = array(
			'success' => __('Success'),
			'error' => __('Failure'),
			'confirm' => __('Confirm'),
			'deploy-success' => sprintf(__("You're build is in progress ! The average time of a build is %s.", "deployeur"), is_array(get_option('deployeur_options')) ? get_option('deployeur_options')['deployeur_average_build_time'] : ""),
			'deploy-error' => __("The deploy has failed, please be sure to have correctly set your webhook URL.", "deployeur"),
			'loading' => __("Loading", "deployeur"),
			'deploy-loading' => __("The deploy is in progress, please wait a few seconds before trying again. If the problem persists, please contact your administrator.", "deployeur"),
			'cancel' => __("Cancel"),
			'confirm-clear' => __("Are you sure you want to clear the history ?", 'deployeur'),
			'confirm-clear-content' => __("This action is irreversible.", "deployeur"),
		);

		// Insert data attribute
		echo '<ul id="mkd-translations" class="hidden">';

		foreach ($translations as $key => $value) {
			echo '<li id="' . $key . '">' . $value . '</li>';
		}

		echo '</ul>';
	}
}
