<?php
/**
 * Header template part.
 */
?>
<section class="page-header">
    <div class="featured-image" style="background-image: url('<?php echo esc_url( get_field( 'header_image', 'option' )['url']); ?>');"></div>
    <div class="breadcrumbs">
        <div class="container container-small">
            <?php
                if( function_exists( 'yoast_breadcrumb' ) ){
                    yoast_breadcrumb( '<div id="breadcrumbs">', '</div>' );
                }
            ?>
        </div><!-- /.container -->
    </div><!-- /.breadcrumbs -->
</section><!-- /.page-header -->