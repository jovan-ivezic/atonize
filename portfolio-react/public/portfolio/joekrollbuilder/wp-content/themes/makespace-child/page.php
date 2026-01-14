<?php get_header(); ?>

	<?php get_template_part( 'template', 'header-image' ); ?>

	<div class="container">
		<?php while( have_posts() ): the_post(); ?>
			<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>
			</article>
		<?php endwhile; ?>
	</div>

	<?php get_template_part( 'template', 'footer-cta' ); ?>

<?php get_footer();