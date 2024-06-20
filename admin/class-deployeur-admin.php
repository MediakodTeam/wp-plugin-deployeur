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
	private $plugin_path;

	/**
	 * The version of this plugin.
	 *
	 * @since    0.1.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * The helpers of the plugin.
	 *
	 * @since    0.2.4
	 * @access   public
	 * @var      Deployeur_Helpers    $helpers    The helpers of the plugin.
	 */
	public $helpers;

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
		add_action('admin_bar_menu', array($this, 'add_admin_topbar_item'), 1000);
		add_action('admin_init', array($this, 'register_options'));

		require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-deployeur-admin-hooks.php';
		require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-deployeur-admin-helpers.php';

		new Deployeur_Hooks();

		$this->helpers = new Deployeur_Helpers();
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
	 * Add the admin menu
	 * 
	 * @since 0.1.2
	 * 
	 */

	public function add_admin_menu() {
		add_menu_page(
			'Deployeur',
			'Deployeur',
			'edit_others_posts',
			'deployeur',
			array($this, 'display_admin_page'),
			'dashicons-cloud',
			99
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
			function () {
				$this->display_admin_page('logs');
			}
		);
	}

	/**
	 * Add admin topbar item
	 * 
	 * @since 0.2.3
	 * 
	 */

	public function add_admin_topbar_item() {
		global $wp_admin_bar;

		$options = get_option('deployeur_options');

		// Add nodes with deployeur_netlify_badge_url from $options
		if (isset($options['deployeur_netlify_badge_url']) && $options['deployeur_netlify_badge_url'] !== '' && $options['deployeur_hostings_type'] == "Netlify") {
			$wp_admin_bar->add_node(array(
				'id' => 'deploy-status-netlify',
				'title' => '<img style="vertical-align: middle" src="' . $options['deployeur_netlify_badge_url'] . '" alt="Netlify Status" />',
				'href' => "#",
				'parent' => 'top-secondary',
				'meta' => array(
					'title' => __('Netlify Status', 'deployeur'),
					'class' => 'deployeur',
					'html' => "<span style='position: absolute; inset: 0; opacity: 0; cursor: not-allowed'></span>"
				)
			));
		}

		// If user has "manage_options" capability
		if (current_user_can('manage_options')) {
			// add items before "My account" on wp admin bar
			$wp_admin_bar->add_node(array(
				'id' => 'trigger-deploy',
				'title' => '<span class="ab-icon dashicons dashicons-cloud" style="top: 2px"></span>Deployeur ' . ($this->helpers->get_count_of_update() > 0 ? '<span class="!px-1.5 inline-flex !h-5 items-center justify-center !ml-1 text-white bg-red-500 !rounded-full plugin-count">' . $this->helpers->get_count_of_update() . '</span>' : ''),
				'href' => admin_url('admin.php?page=deployeur'),
				'parent' => 'top-secondary',
				'meta' => array(
					'title' => __('Deployeur', 'deployeur'),
					'class' => 'deployeur',
				)
			));

			// Add subnodes
			$wp_admin_bar->add_node(array(
				'id' => 'deployeur-deploy-now',
				'title' => __('Deploy now', 'deployeur'),
				'href' => "#",
				'parent' => 'trigger-deploy',
				'meta' => array(
					'title' => __('Deployeur', 'deployeur'),
					'class' => 'deployeur',
					'html' => "<span id='trigger-deploy' style='position: absolute; inset: 0; opacity: 0; cursor: pointer' data-deploy-webhook='" . (is_array($options) ? $options['deployeur_webhook_url'] : '') . "' data-deploy-hosting='" . (is_array($options) ? $options['deployeur_hostings_type'] : '') . "'  data-deploy-success='" . sprintf(__('You&apos;re build is in progress ! The average time of a build is %s.', 'deployeur'), is_array($options) ? $options['deployeur_average_build_time'] : '') . "' data-deploy-error='" . __("The deploy has failed, please be sure to have correctly set your webhook URL.", "deployeur") . "' data-ajax-url='" . admin_url('admin-ajax.php') . "'></span>"
				)
			));
		} else {
			$wp_admin_bar->add_node(array(
				'id' => 'trigger-deploy',
				'title' => '<span class="ab-icon dashicons dashicons-cloud" style="top: 2px"></span>Deployeur ' . ($this->helpers->get_count_of_update() > 0 ? '<span class="!px-1.5 inline-flex !h-5 items-center justify-center !ml-1 text-white bg-red-500 !rounded-full plugin-count">' . $this->helpers->get_count_of_update() . '</span>' : ''),
				'href' => "#",
				'parent' => 'top-secondary',
				'meta' => array(
					'title' => __('Deployeur', 'deployeur'),
					'class' => 'deployeur',
					'html' => "<span id='trigger-deploy' style='position: absolute; inset: 0; opacity: 0; cursor: pointer' data-deploy-webhook='" . (is_array($options) ? $options['deployeur_webhook_url'] : '') . "' data-deploy-hosting='" . (is_array($options) ? $options['deployeur_hostings_type'] : '') . "'  data-deploy-success='" . sprintf(__('You&apos;re build is in progress ! The average time of a build is %s.', 'deployeur'), is_array($options) ? $options['deployeur_average_build_time'] : '') . "' data-deploy-error='" . __("The deploy has failed, please be sure to have correctly set your webhook URL.", "deployeur") . "' data-ajax-url='" . admin_url('admin-ajax.php') . "'></span>"
				)
			));
		}
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
			case 'logs':
				require_once $this->plugin_path . '/admin/partials/deployeur-admin-logs.php';
				break;
			default:
				require_once $this->plugin_path . '/admin/partials/deployeur-admin-display.php';
		}
	}

	public function get_options_sections() {
		return array(
			array(
				"id" => "deployeur_section_hosting",
				"title" => __('Hosting settings', 'deployeur'),
				"description" => __('Those informations are used to connect your WordPress installation to your hosting provider.', 'deployeur'),
				"icon" => "database"
			),
			array(
				"id" => "deployeur_section_site_options",
				"title" => __('Site settings', 'deployeur'),
				"description" => __('The informations provided here are used to  tweak the WordPress API with your frontend URL.', 'deployeur'),
				"icon" => "admin-settings"
			),
			array(
				"id" => "deployeur_section_images_options",
				"title" => __('Images settings', 'deployeur'),
				"description" => __('The informations provided here will be used to tweak the WordPress API with custom end points.', 'deployeur'),
				"icon" => "format-gallery"
			),
			array(
				"id" => "deployeur_section_plugin_options",
				"title" => __('Plugin settings', 'deployeur'),
				"description" => __('Check this box if you want to keep your settings and data into the WordPress database when you remove the plugin.', 'deployeur'),
				"icon" => "admin-generic"
			),
		);
	}

	public function get_options_fields() {
		return array(
			array(
				"type" => "select",
				"name" => "deployeur_hostings_type",
				"title" => __("Hosting provider", 'deployeur'),
				"section" => "deployeur_section_hosting",
				"options" => array(
					"none" => __("None", 'deployeur'),
					"Vercel" => __("Vercel", 'deployeur'),
					"Netlify" => __("Netlify", 'deployeur'),
				)
			),
			array(
				"name" => "deployeur_webhook_url",
				"title" => __("Webhook URL", 'deployeur'),
				"section" => "deployeur_section_hosting",
				"note" => __("Learn how to create hooks with <a href='https://docs.netlify.com/configure-builds/build-hooks/' rel='noopener' target='_blank'>Netlify</a> or <a href='https://vercel.com/docs/concepts/git/deploy-hooks' rel='noopener' target='_blank'>Vercel</a>.", 'deployeur'),
			),
			array(
				"name" => "deployeur_netlify_badge_url",
				"title" => __("Netlify badge URL", 'deployeur'),
				"section" => "deployeur_section_hosting",
				"note" => __("This badge field will only be available when you use Netlify.", 'deployeur'),
				"placeholder" => "https://api.netlify.com/api/v1/badges/YOUR_UNIQUE_ID/deploy-status",

			),
			array(
				"name" => "deployeur_average_build_time",
				"title" => __("Average time of build", 'deployeur'),
				"section" => "deployeur_section_hosting",
				"note" => __("Fill this field with your average build time (you should find it in the deployments history section into the dashboard of your hosting provider).<br/>It will be used to display a notification to your content editor after they triggered a deploy.", 'deployeur'),
				"placeholder" => __("2 mn", 'deployeur'),
			),
			array(
				"name" => "deployeur_public_url",
				"title" => __("Public URL", 'deployeur'),
				"section" => "deployeur_section_site_options",
				"note" => __("Enter here the domain name where you want your content to be used.", 'deployeur'),
				"placeholder" => "https://yourwebsite.com",
			),
			array(
				"type" => "checkbox",
				"name" => "deployeur_keep",
				"title" => __("Data", 'deployeur'),
				"section" => "deployeur_section_plugin_options",
				"label" => __("Keep my data into WordPress when I delete the plugin folder from this installation.", 'deployeur'),
			),
			array(
				"name" => "deployeur_imgkit_url",
				"title" => __("ImageKit endpoints", 'deployeur'),
				"section" => "deployeur_section_images_options",
				"note" => __("Not available yet.", 'deployeur'),
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
