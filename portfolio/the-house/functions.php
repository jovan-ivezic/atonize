<?php
/**
 * Theme functions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 *
 * @package WordPress
 * @subpackage Custom Theme
 * @since Custom Theme 1.0
 */

// Sets up the content width value based on the theme's design and stylesheet.
if ( ! isset( $content_width ) ) {
	$content_width = 625;
}
/**
 * Theme setup
 *
 * Sets up theme defaults and registers the various WordPress features. This
 * function is attached to 'after_setup_theme' action hook.
 *
 * Child themes should do their setup on the 'after_setup_theme' hook
 * with a priority of 11 if they want to override parent theme features.
 * Use a priority of 9 if wanting to run before the parent theme.
 *
 * @uses add_theme_support()
 *
 * @link https://codex.wordpress.org/Function_Reference/add_theme_support
 * @link http://justintadlock.com/archives/2010/12/30/wordpress-theme-function-files
 */
function house_setup() {
	/**
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 */
	load_theme_textdomain( 'house', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/**
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 *
	 * We are removing the old function hooked to 'wp_title' filter:
	 * @link http://codex.wordpress.org/Function_Reference/wp_title
	 */
	add_theme_support( 'title-tag' );

	/**
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://codex.wordpress.org/Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	/**
	 * Add support for html5
	 *
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 *
	 * @link https://codex.wordpress.org/Theme_Markup
	 */
	add_theme_support( 'html5', array(
		'comment-list',
		'comment-form',
		'search-form',
		'gallery',
		'caption'
	) );

	/**
	 * Enable support for Post Formats.
	 *
	 * @link https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
		'gallery',
		'status',
		'audio',
		'chat',
	) );

	/**
	 * Load scripts and styles to front end
	 *
	 * @link https://codex.wordpress.org/Plugin_API/Action_Reference/wp_enqueue_scripts
	 */
	add_action( 'wp_enqueue_scripts', 'house_scripts_styles' );

	/**
	 * Register nav menus
	 */
	add_action( 'init', 'house_register_nav_menus' );

	/**
	 * Show home link in nav menu fallback
	 *
	 * @link https://developer.wordpress.org/reference/hooks/wp_page_menu_args/
	 */
	add_filter( 'wp_page_menu_args', 'house_page_menu_args' );

	/**
	 * Set custom image sizes
	 */
	add_action( 'init', 'house_add_image_sizes' );

	/**
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, icons, and column width.
	 *
	 * @link https://codex.wordpress.org/Function_Reference/add_editor_style
	 */
	add_editor_style( 'editor-style.css' );

	/**
	 * First remove wpautop filter so that we can call it again without <br> tag
	 *
	 * @link https://codex.wordpress.org/Plugin_API/Filter_Reference/the_content
	 */
	remove_filter( 'the_content', 'wpautop' );
	remove_filter( 'the_excerpt', 'wpautop' );
	add_filter( 'the_content', 'house_remove_br_tag' );
	add_filter( 'the_excerpt', 'house_remove_br_tag' );

	/**
	 * Stop Compressing JPEG Files
	 *
	 * @link https://developer.wordpress.org/reference/hooks/jpeg_quality/
	 * @link http://wpmu.org/how-to-change-jpeg-compression-in-wordpress/
	 */
	add_filter( 'jpeg_quality', create_function( '', 'return 100;' ) );

	/**
	 * Update default options
	 *
	 * Do use these carefully. Once the option is set here, there is no way to change its value
	 * from dashboard. Set here only those for which we are certain that will remain as in here.
	 *
	 * @link https://codex.wordpress.org/Function_Reference/update_option
	 * @link https://codex.wordpress.org/Option_Reference
	 */
	// We don't want year-month uploads folders
	// update_option( 'uploads_use_yearmonth_folders', 0 );
	// we want uploads 'images' folder
	// update_option( 'upload_path', 'wp-content/uploads/images' );
	// set permalink structure
	update_option( 'permalink_structure', '/%postname%/' );

}
add_action( 'after_setup_theme', 'house_setup' );

/**
 * Global variables
 *
 * The most used WordPress core functions.
 *
 */
function house_global_site() {
	$site = array(
		'home' 					=> esc_url( home_url( '/' ) ),
		'name'					=> get_bloginfo( 'name' ),
		'description'			=> get_bloginfo( 'description' ),
		'language'				=> get_bloginfo( 'language' ),
		// this is the only way to get title for blog page ( index.php )
		'blog' 					=> get_option( 'page_for_posts', true ),

		'wpurl'					=> get_bloginfo( 'wpurl' ),
		'url'					=> get_bloginfo( 'url' ),
		'rss_url'				=> get_bloginfo( 'rss_url' ),
		'rss2_url'				=> get_bloginfo( 'rss2_url' ),

		'theme_name' 			=> function_exists( 'wp_get_theme' ) ? wp_get_theme() : get_current_theme(),
		'template_url' 			=> get_bloginfo( 'template_url' ),
		'stylesheet_url'		=> get_bloginfo( 'stylesheet_url' ),
		'stylesheet_directory'	=> get_bloginfo( 'stylesheet_directory' ),
		'theme_url' 			=> get_template_directory_uri(),
		// use this to enqueue scripts and styles in child theme
		// https://codex.wordpress.org/Function_Reference/wp_upload_dir
		'child_theme' 			=> get_stylesheet_directory_uri(),
		// this is array, path is $globalSite['upload_dir']['baseurl'] . '/';
		'upload_dir' 			=> wp_upload_dir(),

		'admin' 				=> admin_url(),
		'admin_email'			=> get_bloginfo( 'admin_email' ),
		'admin_profile' 		=> admin_url( 'profile.php' ),

		'version' 				=> get_bloginfo( 'version' )
	);
	return apply_filters( 'house_global_site_filter', $site );
}
$globalSite = house_global_site();
global $globalSite;

/**
 * Load scripts and styles
 *
 * Load js and css files when and where needed. Avoid loading
 * files which are already in WordPress core.
 * @see wp-includes/script-loader.php
 *
 * @link https://codex.wordpress.org/Plugin_API/Action_Reference/wp_enqueue_scripts
 *
 */
function house_scripts_styles() {
	global $wp_styles;

	$bowerDir = get_template_directory_uri() . '/bower_components/';

	/**
	 * Scripts
	 */
	// Threaded comments
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	// Modernizr
	wp_enqueue_script( 'modernizr-js', $bowerDir . 'modernizr/modernizr.js', array(), '2.8.3' );

	/**
	 * jQuery
	 *
	 * Load from Google Ajax Libraries with local fallback
	 * if Google Library is not available.
	 */
	wp_deregister_script('jquery');

	$url = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'; // the URL to check against
	$test_url = @fopen($url,'r'); // test parameters
	//if the URL exists if exists then register the external file
	if ( $test_url !== false ) {
		wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js', array(), '2.1.4', true );
	} else { // register the local file
		wp_register_script( 'jquery', $bowerDir . 'jquery/dist/jquery.min.js', __FILE__, '2.1.4.', true );
	}

	// register other scripts
	wp_register_script( 'svg4everybody', $bowerDir . 'svg4everybody/dist/svg4everybody.min.js', array(), '1.0.0', true );
	wp_register_script( 'init', get_template_directory_uri() . '/js/init.min.js', array(), '1.0.0', true );
	wp_register_script( 'all', get_template_directory_uri() . '/js/all.min.js', array(), '1.0.0', true );

	// call scripts
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'svg4everybody' );
	// wp_enqueue_script( 'all' );
	wp_enqueue_script( 'init' );

	/**
	 * Styles
	 */
	// Main stylesheet
	wp_enqueue_style( 'house-main-style', get_stylesheet_uri(), array(), '2.0' );
	// IE styles
	wp_enqueue_style( 'house-ie', get_template_directory_uri() . '/ie.css', array( 'house-main-style' ), '1.0' );
		$wp_styles->add_data( 'house-ie', 'conditional', 'lt IE 9' );
}
/**
 * Register nav menus
 *
 * This function is attached to 'init' action hook. @see house_setup()
 *
 * @uses register_nav_menu() 	Add support for navigation menus.
 *
 * @param string 	$location 		Menu location identifier, like a slug.
 * @param string 	$description 	Menu location descriptive text.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_nav_menu
 */
function house_register_nav_menus() {
	// This theme uses wp_nav_menu() in three locations.
	register_nav_menu( 'primary', 	__( 'Primary Menu', 	'house' ) );
	register_nav_menu( 'secondary', __( 'Secondary Menu', 	'house' ) );
}
/**
 * Navigation fallback
 *
 * Makes wp_nav_menu() fallback, wp_page_menu(), show a home link. This function
 * is attached to 'wp_page_menu_args' filter hook. @see house_setup()
 *
 * @param  array $args 	Array of default args
 * @return array 		Filtered nav
 */
function house_page_menu_args( $args ) {
	if ( ! isset( $args['show_home'] ) ) {
		$args['show_home'] = true;
	}
	return $args;
}
/**
 * Set custom image sizes
 *
 * This function is attached to 'init' action hook. @see house_setup()
 *
 * @uses set_post_thumbnail_size() 	Set the default Featured Image dimensions.
 *
 * @param int        	$width  	Image width in pixels.
 * @param int        	$height 	Image height in pixels.
 * @param bool|array 	$crop   	Optional. Whether to crop images to specified height and width or resize.
 *                           		An array can specify positioning of the crop area. Default false.
 * @return bool|array 				False, if no image was created. Metadata array on success.
 *
 * @link http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
 *
 * @uses add_image_size() 			Set custom image sizes.
 *
 * @param string     	$name   	Image size identifier.
 * @param int        	$width  	Image width in pixels.
 * @param int        	$height 	Image height in pixels.
 * @param bool|array 	$crop   	Optional. Whether to crop images to specified height and width or resize.
 *                           		An array can specify positioning of the crop area. Default false.
 * @return bool|array 				False, if no image was created. Metadata array on success.
 *
 * @link http://codex.wordpress.org/Function_Reference/add_image_size
 *
 */
function house_add_image_sizes() {
	set_post_thumbnail_size( 800, 0, true ); // Proportional crop
	add_image_size( 'featured-preview', 100, 75, true ); // Used for feature image preview in pages and posts lists in dashboard
	add_image_size( 'full-featured', 2000, 0 ); // Full size images
}

/**
 * Remove <br> tag
 *
 * By default WordPress converts double line breaks to paragraphs and single line break to <br>.
 * While <p> tags are acceptable in most cases, <br> is just annoying. First we have removed
 * wpautop filter on content and excerpt which is responsible for such conversions,
 * in order to call it again but with <br> tags disabled.
 *
 * This function is attached to 'the_content' and 'the_excerpt' filter hooks. @see house_setup()
 *
 * @uses wpautop() 		Changes double line-breaks in the text into HTML paragraphs (<p>...</p>).
 *
 * @param string 	$pee 	The text which has to be formatted.
 * @param bool 		$br 	Optional. If set, this will convert all remaining line-breaks after paragraphing.
 *                    		Default true.
 *
 * @return string 			Text which has been converted into correct paragraph tags.
 * @link https://core.trac.wordpress.org/browser/tags/3.9.1/src/wp-includes/formatting.php#L0
 * @link http://wordpress.stackexchange.com/questions/130075/stop-wordpress-automatically-adding-br-tags-to-post-content#answer-130089
 */
function house_remove_br_tag( $content ) {
    return wpautop( $content, false );
}

// include custom functions
include( get_template_directory() . '/admin/index.php' );
// include external api related functions
include( get_template_directory() . '/inc/api/index.php' );
// include custom functions
include( get_template_directory() . '/inc/general.php' );
// include all branding related custom functions
include( get_template_directory() . '/inc/branding/index.php' );
// include all content related custom functions
include( get_template_directory() . '/inc/content/index.php' );
// include all custom post type related functions
include( get_template_directory() . '/inc/cpt/index.php' );
// include all images related functions
include( get_template_directory() . '/inc/images/index.php' );
// include all navigation related functions
include( get_template_directory() . '/inc/navigations/index.php' );
// include all plugins related functions
include( get_template_directory() . '/inc/plugins/index.php' );
// include all shortcodes related functions
include( get_template_directory() . '/inc/shortcodes/index.php' );
// Here include all sidebars related functions
include( get_template_directory() . '/inc/sidebars/index.php' );