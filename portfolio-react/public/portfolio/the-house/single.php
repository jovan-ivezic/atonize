<?php
/**
 * The Template for displaying all single posts.
 *
 * @todo  single nav
 * @todo  comments template
 *
 * @package WordPress
 */
get_header();?>

	<?php while ( have_posts() ) : the_post(); ?>

		<?php
			if ( has_post_format() ) {
				get_template_part( 'format', get_post_format() );
			}
			elseif ( post_type_exists( get_post_type() ) ) {
				get_template_part( 'content', get_post_type() );
			}
			else {
				get_template_part( 'content' );
			}
		?>

		<?php // single nav goes here ?>

		<?php // comments_template( '', true ); ?>

	<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>