<?php

/**
 * The admin-specific functionality of the plugin for listen hooks.
 *
 * @since      0.2.4
 *
 * @package    Deployeur
 * @subpackage Deployeur/admin/hooks
 */

class Deployeur_Hooks extends Deployeur_Admin {
	/**
	 * Define the functionality of the hooks.
	 *
	 *
	 * @since    0.2.4
	 */
	public function __construct() {
		$this->load_hooks();


		require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-deployeur-admin-helpers.php';

		$this->helpers = new Deployeur_Helpers();
	}

	/**
	 * Load the hooks.
	 *
	 * @since    0.2.5
	 */
	public function load_hooks() {
		add_action('save_post', array($this, 'listen_saved_post'), 10, 3);
		add_action('wp_update_nav_menu', array($this, 'listen_saved_menu'), 10, 1);
		add_action('pre_trash_post', array($this, 'listen_delete_post'), 10, 2);
		add_action('transition_post_status', array($this, 'listen_post_status_transition'), 10, 3);
	}

	/**
	 * Listen the post save action.
	 * 
	 * @since 0.2.5
	 * 
	 * @param int $post_id The post ID
	 * @param WP_Post $post The post object
	 * @param bool $update Whether this is an existing post being updated or not
	 * 
	 * @return void
	 */
	public function listen_saved_post($post_id, $post, $update) {
		// 1. Avoid new post until there's publishad
		// 2. Avoid action on revision
		// 3. Avoid draft
		// 4. Avoid autosave
		// 5. Avoid on menu update
		// 6. Avoid trash
		if (
			!$update ||
			wp_is_post_revision($post_id) ||
			$post->post_status == 'draft' ||
			(defined('DOING_AUTOSAVE') and DOING_AUTOSAVE) ||
			isset($_POST['menu-item-db-id']) ||
			$post->post_status == 'trash'
		) {
			return;
		}

		// Check if this is a new post
		$post_state = $this->is_new_post($post_id) ? 'post_published' : 'post_updated';

		$this->helpers->register_logs($post_id, $post_state, $post->post_title);
	}

	/**
	 * Listen the post delete action.
	 * 
	 * @since 0.2.5
	 * 
	 * @param int $post_id The post ID
	 * @param WP_Post $post The post object
	 * 
	 * @return void
	 */
	public function listen_post_status_transition($new_status, $old_status, $post) {
		// Handle Trash to Draft
		if ($new_status == 'draft' && $old_status == 'trash') {
			$this->helpers->register_logs($post->ID, 'post_restored', $post->post_title);
		}

		// Handle Published to Draft
		if ($new_status == 'draft' && $old_status == 'publish') {
			$this->helpers->register_logs($post->ID, 'post_unpublished', $post->post_title);
		}

		return;
	}

	/**
	 * Listen the menu save action.
	 * 
	 * @since 0.2.5
	 * 
	 * @param int $menu_id The menu ID
	 * 
	 * @return void
	 */
	public function listen_saved_menu($menu_id) {

		// Create a session to avoid double action
		session_start();

		if (!isset($_SESSION['listen_saved_menu'])) {

			// Get menu name
			$menu_data = wp_get_nav_menu_object($menu_id);

			// Register log
			$this->helpers->register_logs($menu_id, 'menu_updated', $menu_data->name);

			$_SESSION['listen_saved_menu'] = 'okay';
		} else {
			unset($_SESSION['listen_saved_menu']);
		}

		session_write_close();
	}

	/**
	 * Listen the post delete action.
	 * 
	 * @since 0.2.5
	 * 
	 * @param int $post_id The post ID
	 * @param WP_Post $post The post object
	 * 
	 * @return void
	 */
	public function listen_delete_post($trash, $post) {
		$this->helpers->register_logs($post->ID, 'post_deleted', $post->post_title);

		return;
	}

	/**
	 * Get current user nicename.
	 * 
	 * @since 0.2.5
	 * 
	 * @return string
	 */
	public function get_current_user_nicename() {
		$current_user = wp_get_current_user();
		return $current_user->user_nicename;
	}

	/**
	 * Check if this is a new post.
	 * 
	 * @since 0.2.5
	 * 
	 * @param int $post_id The post ID
	 * 
	 * @return bool
	 */
	public function is_new_post($post_id) {
		$post = get_post($post_id);
		return $post->post_date == $post->post_modified;
	}
}
