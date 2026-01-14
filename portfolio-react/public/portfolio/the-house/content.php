<?php
/**
 * The default template for displaying content.
 * Used for both single and index/archive/search.
 *
 * @package WordPress
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="entry-header">
		<?php get_template_part( 'partials/content/title-singular' ); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php get_template_part( 'partials/content/post-content' ); ?>
	</div>

	<footer class="entry-footer">
		<?php get_template_part( 'partials/meta/post-author' ); ?>
	</footer><!-- .entry-meta -->
</article><!-- #post -->