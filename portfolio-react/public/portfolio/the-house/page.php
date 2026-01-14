<?php
/**
 * The template for displaying all pages by default.
 *
 * This template is without sidebar. For adding sidebars on each side, use page templates.
 *
 */
get_header(); ?>

	<?php while ( have_posts() ) : the_post(); ?>

		<?php get_template_part( 'content', 'page' ); ?>

		<?php // comments_template( '', true ); ?>

	<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>