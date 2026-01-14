<?php
/**
 * The template for displaying Search Results pages.
 *
 * @package WordPress
 */
get_header();?>

	<?php if ( have_posts() ) : ?>

		<div class="search-form-wrap">
			<p><?php _e( 'Not happy with results? Search again.', 'house' ); ?></p>
			<?php get_search_form(); ?>
		</div>

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
	<?php endif; ?>

<?php get_footer(); ?>