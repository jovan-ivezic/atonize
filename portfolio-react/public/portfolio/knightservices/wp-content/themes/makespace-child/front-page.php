<?php get_header(); ?>
	<main class="site-main" role="main">

		<?php while( have_posts() ): the_post(); ?>

			<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

				<div class="triangle-up"></div>
				<section class="services">
					<div class="container">
						<h2>Ladder services</h2>

						<?php if ( have_rows( 'home_services' ) ) : ?>
							<div class="services-list">
								<?php while ( have_rows( 'home_services' ) ) : the_row(); ?>
									<?php $service_id = get_sub_field( 'home_service' ); ?>
									<a href="<?php echo esc_url( get_permalink( $service_id ) ); ?>" class="services-list-item">
										<img src="<?php echo esc_url( get_field( 'service_menu_icon', $service_id )['url'] ); ?>" />
										<h3><?php echo esc_html( get_the_title( $service_id ) ); ?></h3>
										<p><?php echo esc_html( get_the_excerpt( $service_id ) ); ?></p>
									</a>
								<?php endwhile; ?>
							</div><!-- /.services-list -->
							<a href="<?php echo home_url() . '/ladder-services'; ?>" class="button-ghost">See All services</a>
						<?php endif; ?>

					</div><!-- /.container -->
				</section><!-- /.services -->

				<section class="about" style="background-image: url('<?php echo esc_url( get_field( 'about_background_image' )['url'] ); ?>');">
					<div class="triangle-up"></div>
					<div class="about-text">
						<h2><?php echo esc_html( get_field( 'about_title' ) ); ?></h2>
						<?php echo get_field( 'about_text' ); ?>
						<a href="<?php echo esc_url( get_field( 'about_button_link' ) ); ?>" class="button-ghost"><?php echo esc_html( get_field( 'about_button_text' ) ); ?></a>
					</div><!-- /.about-text -->
				</section><!-- /.about -->

				<section class="technology" style="background-image: url('<?php echo esc_url( get_field( 'help_background_image' )['url'] ); ?>');">
					<div class="container">
						<div class="technology-content">
							<div class="technology-item">
								<?php echo get_field( 'help_text' ); ?>
								<a href="<?php echo esc_url( get_field( 'help_button_link' ) ); ?>" class="button"><?php echo esc_html( get_field( 'help_button_text' ) ); ?></a>
							</div><!-- /.technology-item -->
							<div class="technology-item">
								<img src="<?php echo esc_url( get_field( 'help_detail_image' )['url'] ); ?>" alt="drone" />
							</div><!-- /.technology-item -->
						</div><!-- /.technology-content -->
					</div><!-- /.container -->
				</section><!-- /.technology -->
				
				<section class="latest-posts">
					<div class="container">
		
						<?php

							$blog_posts = get_posts(array(
								'posts_per_page' => 10,
							));
						
							printf('<h2 class="latest-posts-heading">%s</h2>', get_the_title(get_option('page_for_posts')));
						
							if ($blog_posts) {
								?>
						
								<div class="posts-slider">
						
									<?php
										foreach ($blog_posts as $post) :
											setup_postdata($post); ?>
											
												<?php get_template_part('template', 'blog-post'); ?>
									<?php	
											wp_reset_postdata();
										endforeach; ?>
						
								</div><!-- /.post-items -->
						
							<?php

							} else {
								echo 'There are no posts to display.';
							}
						
							printf('<a href="%1$s" class="button-ghost">See all articles</a>', get_permalink(get_option('page_for_posts')));
						?>
						
					</div><!-- /.container -->
				</section><!-- /.latest-posts -->

				<?php get_template_part( 'template', 'footer-cta' ); ?>
				
			</article>

		<?php endwhile; ?>
	
	</main><!-- /.site-main -->
	
<?php get_footer();