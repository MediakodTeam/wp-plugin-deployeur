<?php

/**
 * The admin-specific functionality of the plugin for listen hooks.
 *
 * @since      0.2.4
 *
 * @package    Deployeur
 * @subpackage Deployeur/admin/helpers
 */

class Deployeur_Helpers {

	/**
	 * Logs the update into the database "logs" table
	 *
	 * @since    0.2.5
	 * 
	 * @param Int $item_id The ID of the item
	 * @param String $state The state of the item
	 * 
	 * @return void
	 */
	public function register_logs(Int $item_id, String $state, String $note = "") {
		$user_id = get_current_user_id();
		$datetime = date('Y-m-d H:i:s');

		// Save to database
		global $wpdb;

		$table_name = $wpdb->prefix . 'deployeur_update';

		$wpdb->insert(
			$table_name,
			array(
				'user_id' => $user_id,
				'date' => $datetime,
				'item_id' => $item_id,
				'status' => $state,
				'note' => $note
			)
		);
	}

	public function get_time_ago($date) {
		$timestamp = strtotime($date);

		$strTime = array(__("second", "deployeur"), __("minute", "deployeur"), __("hour", "deployeur"), __("day", "deployeur"), __("month", "deployeur"), __("year", "deployeur"));
		$length = array("60", "60", "24", "30", "12", "10");

		$currentTime = time();
		if ($currentTime >= $timestamp) {
			$diff     = time() - $timestamp;
			for ($i = 0; $diff >= $length[$i] && $i < count($length) - 1; $i++) {
				$diff = $diff / $length[$i];
			}

			$diff = round($diff);
			return $diff . " " . $strTime[$i] . ($diff > 1 ? "s" : "") . " ago";
		}
	}

	/**
	 * Get the status icon
	 *
	 * @since    0.2.5
	 * 
	 * @param String $status The status of the item
	 * 
	 * @return String The status icon
	 */
	public function get_status_icon($status) {
		switch ($status) {
			case "post_published":
				return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-400">
				<path fill="currerntColor" stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
			 </svg>';
			case "post_unpublished":
				return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-400">
				<path fill="currerntColor" stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
			 </svg>
			 ';
			case "post_deleted":
				return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-400">
				<path fill="currerntColor" stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
			 </svg>
			 ';
			default:
				return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-400">
				<path fill="currerntColor" stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
			 </svg>
			 ';
		}
	}

	/**
	 * Get the status text
	 *
	 * @since    0.2.5
	 * 
	 * @param String $status The status of the item
	 * 
	 * @return String The status text
	 */
	public function get_status_text($item_id, $user_id, $status, $note) {

		// If $status start with menu_, get menu name
		if (strpos($status, "menu_") !== false) {
			$menu = wp_get_nav_menu_object($item_id);

			$title = $menu->name;
		} else {
			$title = get_the_title($item_id) ?: $note;
		}

		$user_name = get_user_by("ID", $user_id)->display_name;

		$post_link = get_edit_post_link($item_id);

		switch ($status) {
			case "post_published":
				return sprintf(__("%s published post <strong><a href='%s'>%s</a></strong>", "deployeur"), $user_name, $post_link, $title);
			case "post_unpublished":
				return sprintf(__("%s unpublished post <strong>%s</strong>", "deployeur"), $user_name, $title);
			case "post_deleted":
				return sprintf(__("%s deleted post <strong>%s</strong>", "deployeur"), $user_name, $title);
			case "menu_updated":
				return sprintf(__("%s updated the menu <strong>%s</strong>", "deployeur"), $user_name, $title);
			default:
				return sprintf(__("%s updated post <strong><a href='%s'>%s</a></strong>", "deployeur"), $user_name, $post_link, $title);
		}
	}

	public function get_count_of_update() {
		global $wpdb;

		$table_name = $wpdb->prefix . "deployeur_update";

		$count = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");

		return $count;
	}
}
