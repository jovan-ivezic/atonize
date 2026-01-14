<?php
/*
 * Template Name: Contact
 */
get_header();

$contact = get_field( 'contact_information', 'option' )[0];
?>

	<main class="site-main" role="main">
		
		<?php get_template_part( 'template', 'header' ); ?>

		<section>
			<div class="container container-small">
				<?php while( have_posts() ): the_post(); ?>
					<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
						<header class="entry-header">
							<h1 class="entry-title"><?php the_title(); ?></h1>
						</header><!-- /.entry-header -->
						<div class="entry-content">
							<?php the_content(); ?>
						</div><!-- /.entry-content -->

						<div class="contact-info">
							<div class="contact-info-item">
								<i class="fa fa-envelope-o" aria-hidden="true"></i>
								<address>
									<span><?php echo $contact['address']; ?></span>
								</address>
							</div><!-- /.contact-info-item -->
							<div class="contact-info-item">
								<i class="fa fa-comment-o" aria-hidden="true"></i>
								<ul>
									<li>
										<a href="tel:<?php echo esc_html( $contact[ 'phone_number' ] ); ?>"><?php echo esc_html( $contact[ 'phone_number' ] ); ?></a>
									</li>
									<li>
										<a href="mailto: <?php echo esc_url( get_field( 'email_address' ) ); ?>"><?php echo esc_html( $contact[ 'email_address' ] ); ?></a>
									</li>
								</ul>
							</div><!-- /.contact-info-item -->
						</div><!-- /.contact-info -->
						<div class="social-icons">
							<h3>Follow Us</h3>
							<?php foreach ( $contact[ 'social_media_links' ] as $social ) :?>
								<a href="<?php echo $social['url']; ?>" target="_blank" class="social-media-link">
									<i class="fa fa-<?php echo $social['class']; ?>"></i>
								</a>
							<?php endforeach; ?>
						</div><!-- /.social-icons -->
						<div class="contact-form">
							<?php echo do_shortcode( '[gravityform id="2" title="false" description="false"]' ); ?>
						</div><!-- /.contact-form -->
					</article>
				<?php endwhile; ?>
			</div>
		</section>
		<section class="coverage" style="background-image: url('<?php echo get_stylesheet_directory_uri(); ?>/assets/contact-bg.jpg');">
			<div class="container container-small">
				<div class="coverage-map">
					<img src="<?php echo esc_url( get_field( 'coverage_map_image' )['url'] ); ?>" alt="coverage map" />
					<div class="coverage-map-content">
						<a href="javascript:;" class="mobile-trigger"><?php echo get_field( 'coverage_title' ); ?></a>
						<div class="mobile-content">
							<?php echo get_field( 'coverage_text' ); ?>
						</div>
					</div><!-- /.coverage-map-content -->
				</div><!-- /.coverage-map -->
			</div><!-- /.container container-small -->
		</section><!-- /.cta -->
	</main><!-- /.site-main -->

<?php get_footer();