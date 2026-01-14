<?php
/**
 * The footer
 *
 * Contains footer content and the closing of the
 * body and html.
 *
 * @package WordPress
 */
?>
		</div><!-- .container -->
	</main><!-- #content -->

	<footer id="mainfooter" class="footer-main" role="contentinfo">
		<div class="container">

			<div id="colophon">
				<p><?php echo house_footer_copyrights(); ?></p>
			</div><!-- #colophon -->

		</div><!-- container -->
	</footer><!-- #mainfooter -->

	<?php get_template_part( 'partials/meta/google-analytics' ); ?>

<?php wp_footer(); ?>
</body>
</html>