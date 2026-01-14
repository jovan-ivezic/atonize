<?php
/**
 * Services archive
 */

get_header(); ?>

<main class="site-main" role="main">

	<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

		<?php get_template_part( 'template', 'header' ); ?>

		<section>

			<div class="container container-small">
				<header class="entry-header">
					<h1 class="entry-title">Ladder services</h1>
				</header><!-- /.entry-header -->
				
				<div class="entry-content">
					<?php echo get_field( 'services_intro', 'option' ); ?>
				</div><!-- /.entry-content -->
			</div><!-- /.container -->

			<div class="container">

				<?php if (have_posts()) : ?>
					<div class="service">

						<?php while (have_posts()) : the_post(); ?>

							<div class="service-item">
								<?php if ( has_post_thumbnail() ) : ?>
									<img src="<?php echo esc_url(get_the_post_thumbnail_url( get_the_ID(), 'thumbnail' )); ?>" alt="service name" class="service-item-icon" />
								<?php endif; ?>
								<div class="service-item-data">
									<div class="entry-content">
										<?php the_title('<h2>', '</h2>'); ?>
										<?php the_content(); ?>
									</div><!-- /.entry-content -->
									<div class="button-wrap">
										<a href="<?php echo esc_url(get_permalink()); ?>" class="button-reverse">Learn more</a>
									</div><!-- /.button-wrap -->
								</div><!-- /.service-item-data -->
							</div><!-- /.service-item -->
						
						<?php endwhile; ?>
						<?php wp_reset_postdata(); ?>
					</div><!-- /.service -->
				<?php endif; ?>
			</div><!-- /.container -->
		</section>

		<?php get_template_part('template', 'footer-cta'); ?>
	
	</article>

</main><!-- /.site-main -->

<?php get_footer();
