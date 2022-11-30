<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @since      0.1.0
 *
 * @package    Deployeur
 * @subpackage Deployeur/admin
 */

class Deployeur_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    0.1.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The plugin path
	 * 
	 * @since 0.1.0
	 * @access private
	 * @var string $plugin_path The plugin path
	 */

	/**
	 * The version of this plugin.
	 *
	 * @since    0.1.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    0.1.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $plugin_path, $version) {

		$this->plugin_name = $plugin_name;
		$this->plugin_path = $plugin_path;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    0.1.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style($this->plugin_name, str_replace(ABSPATH, '/', $this->plugin_path) . '/dist/main.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    0.1.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_script($this->plugin_name, str_replace(ABSPATH, '/', $this->plugin_path) . '/dist/index.js', array('jquery'), $this->version, false);
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    0.1.0
	 */

	public function run() {
		$this->loader->run();
	}
}
