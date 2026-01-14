<?php

class MakespaceChild {

	function __construct(){
		add_action( 'wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ) );
		add_filter( 'upload_mimes', array( $this, 'cc_mime_types' ) );
	}

	function wp_enqueue_scripts(){
		$google_api_key = get_field( 'msw_google_map_api_key', 'option' );
		wp_enqueue_script('google_maps', 'https://maps.googleapis.com/maps/api/js?key='.$google_api_key);

		$msw_object = array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'home_url' => home_url(),
			'show_dashboard_link' => current_user_can( 'manage_options' ) ? 1 : 0,
			'site_url' => site_url(),
			'stylesheet_directory' => get_stylesheet_directory_uri()
		);
		wp_enqueue_script( 'theme', get_stylesheet_directory_uri() . '/scripts.min.js' );
		wp_localize_script( 'theme', 'MSWObject', $msw_object );

		wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css?family=Nunito+Sans:300,300i,400,600,700|Prata' );
		wp_enqueue_style( 'theme', get_stylesheet_uri() );
	}

	function cc_mime_types($mimes) {
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}
}

$MakespaceChild = new MakespaceChild();
