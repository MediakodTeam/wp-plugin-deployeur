<?php

/**
 * Plugin Name: Deployeur
 * Description: Use WordPress as a headless CMS. Stop triggering rebuilds whenever changes are made in your admin dashboard. Review your change history and deploy your contents using webhooks from Netlify or Vercel.
 * Plugin URI:  https://mediakod.com
 * Author:      Mediakod
 * Author URI:  https://mediakod.com
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version:     0.2.5
 * Text Domain: mk-deployeur
 * Prefix: mkd_
 * 
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

define('MKD_VERSION', '0.2.4');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-deployeur-activator.php
 */
function activate_deployeur() {
	require_once plugin_dir_path(__FILE__) . 'includes/class-deployeur-activator.php';
	Deployeur_Activator::activate();
}

/**
 * The code that runs during plugin deletion.
 * This action is documented in includes/class-deployeur-desactivator.php
 */
function delete_deployeur() {
	require_once plugin_dir_path(__FILE__) . 'includes/class-deployeur-desactivator.php';
	Deployeur_Deactivator::uninstall();
}

register_activation_hook(__FILE__, 'activate_deployeur');
// TODO : at release -> comment register_deactivation_hook and uncomment register_uninstall_hook
register_deactivation_hook(__FILE__, 'delete_deployeur');
// register_uninstall_hook(__FILE__, 'delete_deployeur');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-deployeur.php';


/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_deployeur() {

	$plugin = new Deployeur();
	$plugin->run();
}

run_deployeur();
