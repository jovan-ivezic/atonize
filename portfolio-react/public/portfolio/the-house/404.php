<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package WordPress
 */
get_header(); ?>

	<article id="post-0" class="post error404 no-results not-found">
		<div class="entry-content">
			<p><?php _e( 'Perhaps searching will help you find what you\'re looking for.', 'house' ); ?></p>
			<?php get_search_form(); ?>
		</div><!-- .entry-content -->
	</article><!-- #post-0 -->

<?php get_footer(); ?>