<?php

class MakespaceChild {

	function __construct(){
		add_action( 'wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ) );
		add_action( 'after_setup_theme', array( $this, 'register_secondary_menu' ) );
		add_filter( 'upload_mimes', array( $this, 'cc_mime_types' ) );
		add_filter( 'wp_nav_menu_objects', array( $this, 'add_images_to_special_submenu' ) );
	}

	function wp_enqueue_scripts(){
		$msw_object = array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'home_url' => home_url(),
			'show_dashboard_link' => current_user_can( 'manage_options' ) ? 1 : 0,
			'site_url' => site_url(),
			'stylesheet_directory' => get_stylesheet_directory_uri()
		);
		wp_enqueue_script( 'theme', get_stylesheet_directory_uri() . '/scripts.min.js' );
		wp_localize_script( 'theme', 'MSWObject', $msw_object );

		wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css?family=Cantarell:400,700|Work+Sans:300,400,500,600,800' );
		wp_enqueue_style( 'theme', get_stylesheet_uri() );
	}


	/**
	 * Register secondary menu.
	 */
	function register_secondary_menu() {
		register_nav_menus( array(
			'secondary' => 'Secondary Navigation',
		) );
	}

	/**
	 * Enable upload for SVG files.
	 */
	function cc_mime_types($mimes) {
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}

	/**
	 * Add featured images to submenu
	 */
	function add_images_to_special_submenu( $items ) {
		$special_menu_parent_ids = array();

		foreach ( $items as $item ) {
			if ( in_array( 'pt-special-dropdown', $item->classes, true ) && isset( $item->ID ) ) {
				$special_menu_parent_ids[] = $item->ID;
			}

			if ( in_array( $item->menu_item_parent, $special_menu_parent_ids ) ) {

					$page_object = get_page( $item->object_id );

					$item->title = sprintf(
					'<div class="menu-item-info">
						<div class="menu-item-featured-image" style="background-image: url(%2$s)"></div>
					 </div>
					<div class="menu-item-title">%1$s</div>',
					$item->title,
					get_field( 'service_menu_icon', $item->object_id )['url']
				);
			}
		}

		return $items;
	}

}

$MakespaceChild = new MakespaceChild();