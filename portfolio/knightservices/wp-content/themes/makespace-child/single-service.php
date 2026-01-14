<?php
/**
 * Template Name: Service detail
 */

get_header(); ?>

<main class="site-main" role="main">

	<?php while( have_posts() ): the_post(); ?>

		<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

			<?php get_template_part( 'template', 'header' ); ?>

			<section>
				<div class="container container-small">
					<header class="entry-header">
						<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
						<a href="<?php echo get_post_type_archive_link( 'service' ); ?>" class="button-ghost">See all services</a>
					</header><!-- /.entry-header -->
					
					<div class="entry-content">
				        <?php the_content(); ?>
				    </div><!-- /.entry-content -->
				</div><!-- /.container -->
				
				<div class="container">
					<div class="service">
			        	<div class="service-item">
			        		<img src="<?php echo get_the_post_thumbnail_url( get_the_ID(), 'thumbnail' ); ?>" alt="service name" class="service-item-icon" />
			        		<div class="service-item-data">
			        			<div class="entry-content">
			        				<?php the_title( '<h2>', '</h2>' ); ?>
			        				<?php the_content(); ?>
			        			</div><!-- /.entry-content -->
			        		</div><!-- /.service-item-data -->
			        	</div><!-- /.service-item -->		        	
			        </div><!-- /.service -->
				</div><!-- /.container -->
			</section><!-- /.services-info -->

			<?php get_template_part( 'template', 'footer-cta' ); ?>
		
		</article>

	<?php endwhile; ?>

</main><!-- /.site-main -->

<?php get_footer();