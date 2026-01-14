<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 */
get_header(); ?>

	<header class="archive-header date-header">
		<?php get_template_part( 'partials/content/title-archive' ); ?>
	</header><!-- .archive-header -->

	<?php if ( have_posts() ) : ?>

		<?php
		/* Start the Loop */
		while ( have_posts() ) : the_post();

			/* Include the post format-specific template for the content. If you want to
			 * this in a child theme then include a file called called content-___.php
			 * (where ___ is the post format) and that will be used instead.
			 */

			if ( has_post_format() ) {
				get_template_part( 'format', get_post_format() );
			}
			elseif ( post_type_exists( get_post_type() ) ) {
				get_template_part( 'content', get_post_type() );
			}
			else {
				get_template_part( 'content' );
			}

		endwhile; ?>

		<?php house_content_pagination( 'pagination' ) ?>

	<?php else : ?>
		<?php get_template_part( 'content', 'none' ); ?>
	<?php endif; ?>

<?php get_footer(); ?>