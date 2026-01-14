<?php
/**
 * Template that displays footer CTA
 */

// Page CTA settings.
$footer_cta_image_field    = get_field( 'footer_cta_image' );
$footer_cta_text_field        = get_field( 'footer_cta_text' );
$footer_cta_button_text_field = get_field( 'footer_cta_link_text' );
$footer_cta_button_link_field = get_field( 'footer_cta_link' );

// If custom page fields are not set add default value.
$footer_cta_image     = '' != $footer_cta_image_field ? $footer_cta_image_field : get_field( 'footer_cta_image', 'option' );
$footer_cta_text         = '' != $footer_cta_text_field ? $footer_cta_text_field : get_field( 'footer_cta_text', 'option' );
$footer_cta_button_text  = '' != $footer_cta_button_text_field ? $footer_cta_button_text_field : get_field( 'footer_cta_link_text', 'option' );
$footer_cta_button_link  = '' != $footer_cta_button_link_field ? $footer_cta_button_link_field : get_field( 'footer_cta_link', 'option' );

?>

<div class="cta">
    <div class="cta-image">
        <img src="<?php echo esc_url( $footer_cta_image['url'] ); ?>" alt="keys" />
    </div><!-- /.cta-image -->
    <div class="cta-text">
        <div class="cta-text-content">
            <?php echo $footer_cta_text; ?>
        </div><!-- /.cta-text-content -->
        <a href="<?php echo esc_url( $footer_cta_button_link ); ?>" class="read-more"><?php echo $footer_cta_button_text; ?> <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
    </div><!-- /.cta-text -->
</div><!-- /.cta -->
