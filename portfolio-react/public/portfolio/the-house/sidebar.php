<?php
/**
 * The sidebar containing the main widget area.
 *
 * If no active widgets in sidebar, hide it completely.
 *
 * @package WordPress
 */
?>

<?php if ( is_active_sidebar( 'main-sidebar' ) ) : ?>
	<div id="sidebar" role="complementary">
		<?php dynamic_sidebar( 'main-sidebar' ); ?>
	</div><!-- #sidebar -->
<?php endif; ?>