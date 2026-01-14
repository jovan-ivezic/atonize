<?php
/**
 * Footer CTA template part.
 */
?>

<section class="cta" style="background-image: url('<?php echo esc_url(get_field('footer_cta_bg_image', 'option')['url']); ?>');">
    <div class="triangle-up"></div>
    <div class="cta-content">
        <img src="<?php echo esc_url(get_field('footer_cta_logo', 'option')['url']); ?>" alt="Knight services logo" class="cta-logo" />
        <?php echo get_field('footer_cta_text', 'option'); ?>
    </div><!-- /.cta-content -->
    <a href="<?php echo esc_url(get_field('footer_cta_button_link', 'option')); ?>" class="button"><?php echo esc_html(get_field('footer_cta_button_text', 'option')); ?></a>
</section><!-- /.cta -->
