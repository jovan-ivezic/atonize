<?php get_header(); ?>

	<?php get_template_part('template', 'header-image'); ?>

		<?php while (have_posts()): the_post(); ?>
			<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
				<div class="container">
					<h1><?php the_title(); ?></h1>
					<?php the_content(); ?>

					<?php if ( have_rows( 'block_content' ) ) : ?>
					<div class="portfolio-gallery">
						<?php while ( have_rows( 'block_content' ) ) : the_row(); ?>
						<div class="portfolio-gallery-item">
							<a href="<?php echo esc_url( get_sub_field( 'block_image' )['url'] ); ?>" style="background-image: url('<?php echo esc_url( get_sub_field( 'block_image' )['url'] ); ?>'); ?>)" class="portfolio-gallery-link">
							</a>
							<p><?php echo get_sub_field( 'block_text' ); ?></p>
						</div><!-- /.portfolio-gallery-item -->
						<?php endwhile; ?>
					</div><!-- /.portfolio-gallery -->
					<?php endif; ?>
				</div><!-- /.container -->

				<?php if ( get_field( 'testimonial_text' ) != '' ) : ?>
				<div class="testimonial">
					<span class="testemonial-quote">”</span>
					<p class="testimonial-text"><?php echo get_field( 'testimonial_text' ); ?></p>
					<span class="testimonial-author"><?php echo get_field( 'testimonial_author' ); ?></span>
					<span class="testimonial-company"><?php echo get_field( 'testimonial_author_location' ); ?></span>
				</div><!-- /.testimonial -->
				<?php endif; ?>

				<div class="container">
					<?php if ( have_rows( 'second_block_content' ) ) : ?>
					<div class="portfolio-gallery">
						<?php while ( have_rows( 'second_block_content' ) ) : the_post(); ?>
						<div class="portfolio-gallery-item">
							<a href="<?php echo esc_url( get_sub_field( 'block_image' ) ); ?>" style="background-image: url('<?php echo esc_url( get_sub_field( 'block_image' ) ); ?>'); ?>)" class="portfolio-gallery-link">
							</a>
							<?php echo get_sub_field( 'block_text' ); ?>
						</div><!-- /.portfolio-gallery-item -->
						<?php endwhile; ?>
					</div><!-- /.portfolio-gallery -->
					<?php endif; ?>
				</div><!-- /.container -->
				<div class="project-spec">
					<div class="container">
						<div class="project-spec-header">
							<h2>Project Specs</h2>
							<ul class="project-spec-services">
								<li>
									<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/service-icon-1.svg" alt="service" />
								</li>
								<li>
									<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/service-icon-2.svg" alt="service" />
								</li>
								<li>
									<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/service-icon-3.svg" alt="service" />
								</li>
								<li>
									<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/service-icon-4.svg" alt="service" />
								</li>
								<li>
									<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/service-icon-5.svg" alt="service" />
								</li>
							</ul><!-- /.project-spec-services -->
						</div><!-- /.project-spec-header -->
						<ul class="project-spec-list">
							<?php while ( have_rows( 'specs' ) ) : the_row(); ?>
								<li><?php echo get_sub_field( 'spec_name' ); ?></li>
							<?php endwhile; ?>
						</ul><!-- /.project-spec-list -->
					</div><!-- /.container -->
				</div><!-- /.project-spec -->
				<div class="additional-details">
					<div class="container">
						<?php echo get_field( 'additional_details' ); ?>
					</div><!-- /.container -->
				</div><!-- /.additional-details -->

				<div class="addtoany-share">
					<h2>Share this project</h2>
					<?php if (function_exists('ADDTOANY_SHARE_SAVE_KIT')) { ADDTOANY_SHARE_SAVE_KIT(); } ?>
				</div><!-- /.addtoany-share -->

				<ul class="page-nav">
					<li class="item prev">
						<?php if (get_previous_post()): $prev = get_previous_post(); ?>
							<a href="<?php echo get_permalink($prev->ID); ?>">
							<i class="fa fa-long-arrow-left" aria-hidden="true"></i> Previous Project</a>
						<?php endif; ?>
					</li>
					<li class="back-to-all">
						<a href="<?php echo get_post_type_archive_link(get_post_type(get_the_ID())); ?>">All projects</a>
					</li>
					<li class="item next">
						<?php if (get_next_post()): $next = get_next_post(); ?>
						<a href="<?php echo get_permalink($next->ID); ?>">Next Project <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
						<?php endif; ?>
					</li>
				</ul> <!-- /.post-nav -->
			</article>
		<?php endwhile; ?>
	
	<?php get_template_part('template', 'footer-cta'); ?>

<?php get_footer();
