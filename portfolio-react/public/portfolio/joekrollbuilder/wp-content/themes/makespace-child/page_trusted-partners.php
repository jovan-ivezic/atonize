<?php
/**
 * Template name: Trusted Partners
 */
?>

<?php get_header(); ?>

	<?php get_template_part('template', 'header-image'); ?>

	<div class="container">
		<?php while( have_posts() ): the_post(); ?>
			<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>

				<?php if ( have_rows( 'trusted_partners' ) ) : ?>
				<div class="partners">
					<?php while ( have_rows( 'trusted_partners' ) ) : the_row(); ?>

						<?php 
							$partner_link = '#';

							if ( get_sub_field( 'partner_link' ) != '' ) {
								$partner_link = esc_url( get_sub_field( 'partner_link' ) );
							}
						?>

						<a href="<?php echo $partner_link; ?>" class="partners-item">
							<div class="partners-img" style="background-image: url('<?php echo esc_url( get_sub_field( 'partner_image' )['url'] ); ?>');"></div><!-- /.partners-img -->
							<h3><?php echo get_sub_field( 'partner_name' ); ?></h3>
							<p><?php echo get_sub_field( 'partner_text' ); ?></p>
						</a><!-- /.partners-item -->

					<?php endwhile; ?>
				</div><!-- /.partners -->
				<?php endif; ?>
			</article>
		<?php endwhile; ?>
	</div>

	<?php get_template_part( 'template', 'footer-cta' ); ?>

<?php get_footer();