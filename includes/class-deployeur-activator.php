<?php

/**
 * Fired during plugin activation
 *
 * @since      0.1.2
 *
 * @package    Deployeur
 * @subpackage Deployeur/includes
 */

class Deployeur_Activator
{

  /**
   * Actions to perform on plugin activation.
   *
   * @since    0.1.2
   */
  public static function activate()
  {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'deployeur';

    $sql = "CREATE TABLE $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
      UNIQUE KEY id (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
  }
}
