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

		add_action('admin_menu', array($this, 'add_admin_menu'));
		add_action('admin_init', array($this, 'register_options'));
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

	/**
	 * Add the admin menu
	 * 
	 * @since 0.1.2
	 * 
	 */

	public function add_admin_menu() {
		add_menu_page(
			'Deployeur',
			'Deployeur',
			'manage_options',
			'deployeur',
			array($this, 'display_admin_page'),
			'dashicons-cloud',
			2
		);

		add_submenu_page(
			'deployeur',
			__('Settings', 'deployeur'),
			__('Settings', 'deployeur'),
			'manage_options',
			'deployeur-options',
			function () {
				$this->display_admin_page('options');
			}
		);

		add_submenu_page(
			'deployeur',
			__('Logs', 'deployeur'),
			__('Logs', 'deployeur'),
			'manage_options',
			'deployeur-logs',
			array($this, 'display_admin_page')
		);
	}

	/**
	 * Display the admin page
	 * 
	 * @since 0.1.2
	 * 
	 */

	public function display_admin_page($page) {
		switch ($page) {
			case 'options':
				require_once $this->plugin_path . '/admin/partials/deployeur-admin-options.php';
				break;
			default:
				require_once $this->plugin_path . '/admin/partials/deployeur-admin-display.php';
		}
	}

	public function get_options_sections() {
		return array(
			array(
				"id" => "deployeur_section_hosting",
				"title" => __('Hosting', 'deployeur'),
				"description" => __('This information is used to connect your WordPress site to your hosting server.', 'deployer'),
				"icon" => "database"
			),
			array(
				"id" => "deployeur_section_site_options",
				"title" => __('Site settings', 'deployeur'),
				"description" => __('This information is used to clean your data on the API'),
				"icon" => "admin-settings"
			),
			array(
				"id" => "deployeur_section_plguin_options",
				"title" => __('Plugin settings', 'deployeur'),
				"icon" => "admin-generic"
			),
		);
	}

	public function get_options_fields() {
		return array(
			array(
				"type" => "select",
				"name" => "deployeur_hostings_type",
				"title" => __("Hosting type", 'deployeur'),
				"section" => "deployeur_section_hosting",
				"options" => array(
					"none" => __("Aucun", 'deployeur'),
					"Vercel" => __("Vercel", 'deployeur'),
					"Netlify" => __("Netlify", 'deployeur'),
				)
			),
			array(
				"name" => "deployeur_webhook_url",
				"title" => __("Webhook URL", 'deployeur'),
				"section" => "deployeur_section_hosting",
			),
			array(
				"name" => "deployeur_netlify_badge_url",
				"title" => __("Netlify badge URL", 'deployeur'),
				"section" => "deployeur_section_hosting",
				"note" => __("The badge will only be used for Netlify host.", 'deployeur'),
			),
			array(
				"name" => "deployeur_average_build_time",
				"title" => __("Average time of build", 'deployeur'),
				"section" => "deployeur_section_hosting",
				"note" => __("The time is used to display to the user that trigger deploy the average time of a build.", 'deployeur'),
			),
			array(
				"name" => "deployeur_public_url",
				"title" => __("Public URL", 'deployeur'),
				"section" => "deployeur_section_site_options",
			),
			array(
				"name" => "deployeur_imgkit_url",
				"title" => __("ImageKit endpoints", 'deployeur'),
				"section" => "deployeur_section_site_options",
			),
			array(
				"type" => "checkbox",
				"name" => "deployeur_keep",
				"title" => __("Data", 'deployeur'),
				"section" => "deployeur_section_plguin_options",
				"label" => __("Keep the data on plugin delete", 'deployeur'),
			)
		);
	}

	/**
	 * Register fields options
	 * 
	 * @since 0.1.2
	 * 
	 * @return void
	 */

	public function register_options() {
		register_setting('deployeur_options', 'deployeur_options');

		foreach ($this->get_options_sections() as $section) {
			add_settings_section(
				$section['id'],
				$section['title'],
				null,
				'deployeur_options'
			);
		}


		foreach ($this->get_options_fields() as $option) {
			add_settings_field(
				$option["name"],
				$option["title"],
				array(),
				'deployeur',
				$option["section"],
				array(
					'label_for'         => $option["name"],
				)
			);
		}
	}
}
