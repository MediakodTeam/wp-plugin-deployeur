<?php

/**
 * Plugin Name: Deployeur
 * Description: A WordPress plugin that use Webhooks to deploy and make history of your WordPress edition.
 * Plugin URI:  https://mediakod.com
 * Author:      Mediakod
 * Author URI:  https://mediakod.com
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version:     0.2.1
 * Text Domain: mk-deployeur
 * Prefix: mkd_
 * 
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
	die;
}

define('MKD_VERSION', '0.2.1');

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
