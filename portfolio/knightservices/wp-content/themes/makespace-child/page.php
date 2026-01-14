<?php get_header(); ?>
	
	<main class="site-main" role="main">

		<?php get_template_part( 'template', 'header' ); ?>
		
		<section>
			<div class="container container-small">
				<?php while( have_posts() ): the_post(); ?>
					<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
						<header class="entry-header">
							<h1 class="entry-title"><?php the_title(); ?></h1>
						</header><!-- /.entry-header -->
						<div class="entry-content">
							<?php the_content(); ?>
						</div><!-- /.entry-content -->
					</article>
				<?php endwhile; ?>
			</div>
		</section>

		<?php get_template_part( 'template', 'footer-cta' ); ?>
		
	</main><!-- /.site-main -->
	
<?php get_footer();