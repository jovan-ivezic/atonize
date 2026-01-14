<?php
/**
 * Template that displays header image
 */

$header_image_url = get_field( 'header_image' )['url'];

if ( is_single() && get_post_type() == 'portfolio' ) {
    $header_image_url = get_the_post_thumbnail_url();
}

if ( is_post_type_archive( 'portfolio' ) ) {
    $header_image_url = get_field('portfolio_header_image', 'option')['url'];
}

if (! $header_image_url) {
    $header_image_url = get_field('header_image', 'option')['url'];
}

?>

<div class="page-header">
		
    <div class="featured-image" style="background-image: url(<?php echo esc_url( $header_image_url ); ?>)"></div>

    <div class="container">
        <?php
            if( function_exists( 'yoast_breadcrumb' ) ){
                yoast_breadcrumb( '<div id="breadcrumbs">', '</div>' );
            }
        ?>
    </div><!-- /.container -->
</div><!-- /.page-header -->
