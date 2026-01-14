<?php
/**
 * The Header
 *
 * Displays all of the <head> section
 *
 * @todo set logo image
 *
 * @package WordPress
 */
?><!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7 ie6">
<![endif]-->
<!--[if IE 7]>
<html id="ie7" <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 ie7">
<![endif]-->
<!--[if IE 8]>
<html id="ie8" <?php language_attributes(); ?> class="no-js lt-ie9 ie8">
<![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?> prefix="og: http://ogp.me/ns#" class="no-js">
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />

<!-- Prefetch DNS for external assets -->
<!-- Prefetch Google services -->
<link rel="dns-prefetch" href="//ajax.googleapis.com">
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//themes.googleusercontent.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">
<!-- Prefetch Vimeo player -->
<link rel="dns-prefetch" href="//secure-b.vimeocdn.com">
<link rel="dns-prefetch" href="//player.vimeo.com">
<link rel="dns-prefetch" href="//i.vimeocdn.com">
<!-- Prefetch Facebook plugins -->
<link rel="dns-prefetch" href="//www.facebook.com">
<link rel="dns-prefetch" href="//connect.facebook.net">
<link rel="dns-prefetch" href="//static.ak.facebook.com">
<link rel="dns-prefetch" href="//static.ak.fbcdn.net">
<link rel="dns-prefetch" href="//s-static.ak.facebook.com">
<!-- Prefetch Twitter -->
<link rel="dns-prefetch" href="//platform.twitter.com">
<link rel="dns-prefetch" href="//p.twitter.com">
<link rel="dns-prefetch" href="//cdn.api.twitter.com">

<title><?php wp_title( '|', true, 'right' ); ?></title>

<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" /><?php
global $wp, $globalSite;
$current_url = home_url( add_query_arg( array(), $wp->request ) . '/');
$sitename = get_bloginfo( 'name' );
$sitedescription = get_bloginfo( 'description' );
$type = '';
if ( is_front_page() ) {
	$type = 'website';
} else {
	$type = 'article';
} ?>
<script type="application/ld+json">
{
	"@context": "http://schema.org",
	"@type": "Organization",
	"name": "<?php echo $sitename; ?>",
	"description": "<?php echo html_entity_decode( $sitedescription ); ?>",
	"url": "<?php echo $globalSite['home']; ?>",
	"logo": "<?php echo $globalSite['template_url']; ?>/images/logo.jpg"
}
</script>
<meta property="og:locale" content="en_US" />
<meta property="og:type" content="<?php echo $type; ?>" />
<meta property="og:title" content="<?php wp_title('|'); ?>" />
<meta property="og:url" content="<?php echo $current_url; ?>" />
<meta property="og:site_name" content="<?php echo $sitename; ?>" />
<meta property="og:description" content="<?php echo html_entity_decode( $sitedescription ); ?>" />
<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/images/logo.jpg" />
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> >

	<!--[if lt IE 9]>
		<div class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</div>
	<![endif]-->

	<header id="mainheader" class="header-main" role="banner">
		<div class="container">
			<?php
				/**
				 * Get site logo if one is uploaded via branding page
				 * If no logo, get the traditional site title and tagline
				 */
				if ( get_site_logo() ) {
					echo get_site_logo();
				} else {
					echo get_site_title();
					echo get_site_description();
				}
			?>
			<?php get_template_part( 'partials/navigations/main' ); ?>
		</div><!-- container -->
	</header><!-- #mainheader -->

	<main id="content" class="content-main" role="main">
		<div class="container">
