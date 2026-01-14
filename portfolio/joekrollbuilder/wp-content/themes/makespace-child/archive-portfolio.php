<?php get_header(); ?>

	<?php get_template_part( 'template', 'header-image' ); ?>

	<div class="container">
		
			<article>
				<h1>Portfolio</h1>
				
				<?php echo get_field( 'portfolio_archive_intro_text', 'option' ); ?>

				<div class="filter-container">
					<div class="filter-label">Filter By</div>
					<div class="filter-dropdown">
						<div class="filter-display">
							<?php
		                        if (single_term_title('', false)) {
		                            single_term_title();
		                        } else {
		                            echo 'All';
		                        }
		                    ?>
						</div>
						<ul>
							<li><a href="<?php echo get_post_type_archive_link( 'portfolio' ); ?>">All</a></li>
							<?php
		                        $categories = get_terms(array(
		                            'taxonomy'   => 'portfolio-category',
									'hide_empty' => false,
									'orderby'    => 'name',
									'order'      => 'ASC',
		                        ));

								if ($categories) {
									foreach ($categories as $category) {
										$caturl = get_category_link($category->term_id);
										$catname = $category->name;

										echo '<li><a href="' . $caturl .'">' . $catname. '</a></li>';
									}
								}
		                    ?>
						</ul>
					</div>
				</div>

				<div class="portfolio">
					<?php while( have_posts() ): the_post(); ?>
						<a href="<?php echo get_permalink(); ?>" class="portfolio-item">
							<div class="portfolio-image" style="background-image: url('<?php echo get_the_post_thumbnail_url(); ?>');">
							</div><!-- /.portfolio-image -->
							<div class="portfolio-excert">
								<?php the_title( '<h2>', '</h2>' ); ?>
								<?php the_excerpt(); ?>
								<span class="read-more">See case study <i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>
							</div><!-- /.portfolio-excert -->
						</a><!-- /.portfolio-item -->
					<?php endwhile; ?>
				</div><!-- /.portfolio -->

				<?php
					echo paginate_links( array(
						'prev_text' => '<i class="fa fa-long-arrow-left"></i>',
						'next_text' => '<i class="fa fa-long-arrow-right"></i>',
						'type' => 'list'
					) );
				?>

			</article>
	</div>

	<?php get_template_part( 'template', 'footer-cta' ); ?>

<?php get_footer();