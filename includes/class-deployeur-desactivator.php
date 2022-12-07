<?php

/**
 * Fired during plugin deactivation
 *
 * @since      0.1.2
 *
 * @package    Deployeur
 * @subpackage Deployeur/includes
 */

class Deployeur_Deactivator {

  /**
   * Short Description. (use period)
   *
   * Long Description.
   *
   * @since    0.1.2
   */
  public static function uninstall() {
    $options = get_option('deployeur_options');

    if (!isset($options['deployeur_keep'])) {
      global $wpdb;

      $table_name = $wpdb->prefix . 'deployeur_history';
      $sql = "DROP TABLE IF EXISTS $table_name";
      $wpdb->query($sql);

      delete_option("deployeur_options");
    }
  }
}
