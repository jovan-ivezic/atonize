<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 */
get_header(); ?>

	<?php if ( have_posts() ) :?>

		<?php
		/* Start the Loop */
		while ( have_posts() ) : the_post();
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
	<?php endif; // end have_posts() check ?>

<?php get_footer(); ?>