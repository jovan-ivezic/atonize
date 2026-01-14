<?php get_header(); ?>

	<?php while( have_posts() ): the_post(); ?>
		<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
			<section class="projects-slider">
				<?php if ( have_rows( 'hero_slides' ) ) : ?>
					<div class="slider">
						<?php while( have_rows( 'hero_slides' ) ) : the_row(); ?>
							<div class="slider-item">
								<div class="slider-image" style="background-image: url('<?php echo esc_url( get_sub_field( 'hero_slide_image' )['url'] ); ?>');">
									<div class="slider-text">
										<h2><?php echo get_sub_field( 'hero_slide_title' ); ?></h2>
									</div><!-- /.slider-text -->
								</div><!-- /.slider-image -->
								<div class="slider-content-bottom">
									<ul>
										<li><?php echo get_sub_field( 'hero_slide_type' ); ?></li>
										<li><?php echo get_sub_field( 'hero_slide_location' ); ?></li>
									</ul>
									<a href="<?php echo esc_url( get_sub_field( 'hero_slide_link' ) ); ?>">Learn more</a>
								</div><!-- /.slider-content-bottom -->
							</div><!-- /.slider-item -->
						<?php endwhile; ?>
					</div><!-- /.slider -->
					<div class="slider-nav">
						<div class="arrows">
						</div><!-- /.arrows -->
						<a href="<?php echo get_post_type_archive_link( 'portfolio' ); ?>" class="all-projects">All Projects</a>
					</div><!-- /.slider-nav -->
				<?php endif; ?>
			</section><!-- /.projects-slider -->
			<section class="location">
				<div class="location-map">
					<div id="cd-map" data-lat="38.1899092" data-lng="-85.69190960000003"></div>
				</div><!-- /.location-map -->
				<div class="location-info">
					<h2><?php echo get_field( 'intro_section_title' ); ?></h2>
					<?php echo get_field( 'intro_section_text' ); ?>
					<a href="<?php echo esc_url( get_field( 'intro_section_link' ) ); ?>" class="read-more"><?php echo get_field( 'intro_section_link_text' ); ?> <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
				</div><!-- /.location-info -->
			</section><!-- /.location -->
			<section class="about">
				<div class="about-info">

					<h2><?php echo get_field( 'about_section_title' ); ?></h2>
					<?php echo get_field( 'about_section_text' ); ?>

					<a href="<?php echo esc_url( get_field( 'about_section_link' ) ); ?>" class="read-more"><?php echo get_field( 'about_section_link_text' ); ?> <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>

					<div class="about-partners">

						<h3>Joe’s Partners</h3>

						<ul>
							<?php while( have_rows( 'joes_partners' ) ) : the_row(); ?>
								<li><?php echo get_sub_field( 'partner_name' ); ?></li>
							<?php endwhile; ?>
						</ul><!-- /.about-partners -->

						<a href="<?php echo esc_url( get_field( 'joes_partners_link' ) ); ?>" class="read-more"><?php echo get_field( 'joes_partners_link_text' ); ?> <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
						
					</div><!-- /.about-partners -->
				</div><!-- /.about-info -->
				<div class="about-image">
					<img src="<?php echo esc_url( get_field( 'about_section_image' )['url'] ); ?>" alt="" />
				</div><!-- /.about-image -->
			</section><!-- /.about -->
			<section class="process">
				<div class="process-intro">
					<h2><?php echo get_field( 'how_it_works_title' ); ?></h2>
					<?php echo get_field( 'how_it_works_text' ); ?>
				</div><!-- /.process-intro -->

				<?php if ( have_rows('how_it_works_steps') ) : ?>
					<div class="process-steps">

						<?php while ( have_rows( 'how_it_works_steps' ) ) : the_row(); ?>
							<div class="process-steps-item">
								<img src="<?php echo esc_url( get_sub_field( 'step_icon' )['url'] ); ?>" alt="Plan Your Budget" />
								<h3><?php echo get_sub_field( 'step_text' ); ?></h3>
							</div><!-- /.process-steps-item -->
						<?php endwhile; ?>
						
					</div><!-- /.process-steps -->
				<?php endif; ?>
				<a href="<?php echo esc_url( get_field( 'how_it_works_link' ) ); ?>" class="read-more"><?php echo get_field( 'how_it_works_link_text' ); ?> <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
			</section><!-- /.process -->

			<?php get_template_part( 'template', 'footer-cta' ); ?>
			
		</article>
	<?php endwhile; ?>

<?php get_footer();