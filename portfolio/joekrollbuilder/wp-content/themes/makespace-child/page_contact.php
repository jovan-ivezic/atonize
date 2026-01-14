<?php
/*
 * Template Name: Contact
 */
get_header();

$contact = get_field( 'contact_information', 'option' )[0];
?>

	<?php get_template_part('template', 'header-image'); ?>

		<?php while( have_posts() ): the_post(); ?>
			<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
				<div class="container">
					<h1><?php the_title(); ?></h1>
					<?php the_content(); ?>
				</div><!-- /.container -->
				<div class="contact-info">
					<div class="container">
						<div class="contact-info-items">
							<a href="tel:<?php echo esc_html( $contact[ 'phone_number' ] ); ?>">
								<i class="fa fa-mobile" aria-hidden="true"></i><?php echo esc_html( $contact[ 'phone_number' ] ); ?>
							</a>
							<a href="mailto:<?php echo esc_html( $contact[ 'email_address' ] ); ?>">
								<i class="fa fa-envelope-o" aria-hidden="true"></i><?php echo esc_html( $contact[ 'email_address' ] ); ?>
							</a>
							<div class="social-icons">
								<a href="javascript:;" target="_blank">
									<i class="fa fa-facebook-official" aria-hidden="true"></i>
								</a>
								<a href="javascript:;" target="_blank">
									<i class="fa fa-youtube-square" aria-hidden="true"></i>
								</a>
							</div><!-- /.social-icons -->
						</div><!-- /.contact-info-items -->
					</div><!-- /.container -->
				</div><!-- /.contact-info -->
				<div class="contact-form">
					<div class="container">
						<?php echo do_shortcode( '[gravityform id="2" title="false" description="false"]' ); ?>
					</div><!-- /.container -->
				</div><!-- /.contact-form -->
			</article>
		<?php endwhile; ?>

	<?php get_template_part( 'template', 'footer-cta' ); ?>

<?php get_footer();