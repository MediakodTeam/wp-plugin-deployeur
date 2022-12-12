<?php

/**
 * Fired during plugin activation
 *
 * @since      0.2.2
 *
 * @package    Deployeur
 * @subpackage Deployeur/includes
 */

class Deployeur_Activator {

  /**
   * Actions to perform on plugin activation.
   *
   * @since    0.2.2
   */
  public static function activate() {
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'deployeur_history';

    $sql = "CREATE TABLE $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
      date datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
      user_id mediumint(9) NOT NULL,
      status varchar(20) NOT NULL,
      webhooks varchar(255) NOT NULL,
      UNIQUE KEY id (id)
    ) $charset_collate;";

    dbDelta($sql);
  }
}
