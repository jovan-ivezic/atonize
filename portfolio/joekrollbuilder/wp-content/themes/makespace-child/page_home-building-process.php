<?php
/**
 * Template name: Home Building Process
 */
?>


<?php get_header(); ?>

	<?php get_template_part( 'template', 'header-image' ); ?>

		<?php while( have_posts() ): the_post(); ?>
			<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

				<div class="container">
					<h1><?php the_title(); ?></h1>
					<?php the_content(); ?>
				</div><!-- /.container -->

				<?php if ( have_rows( 'home_building_process_steps' ) ) : ?>
				<div class="building-steps">
					<?php while ( have_rows( 'home_building_process_steps' ) ) : the_row(); ?>
				
					<div class="building-steps-item">
						<div class="building-steps-content">
							<img class="step-image" src="<?php echo get_sub_field( 'step_icon' )['url']; ?>" alt="Plan Your Budget" />
							<div class="step-info">
								<h2><?php echo get_sub_field( 'step_title' ); ?></h2>
								<?php echo get_sub_field( 'step_text' ); ?>
							</div><!-- /.step-info -->
						</div><!-- /.building-steps-content -->
					</div><!-- /.building-steps-item -->

					<?php endwhile; ?>
				</div><!-- /.building-steps -->
				<?php endif; ?>

			</article>
		<?php endwhile; ?>

	<?php get_template_part( 'template', 'footer-cta' ); ?>

<?php get_footer();