<?php get_header(); ?>

	<main class="site-main" role="main">
		
		<?php get_template_part( 'template', 'header' ); ?>

		<section>
			<div class="container container-small">
				<header class="entry-header">
					<h1 class="entry-title">Knight Blog</h1>
				</header><!-- /.entry-header -->
				<div class="archive-description">
					<p>
						Sed felis neque viverra in eleifend acpharetra in lectus. Curabitur tristique turpis semper quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Fusce varius risus dapibus dolor. Donec tristique faucibus velit aliquam erat volutpat integer sed felis. Quisque odio lacus tincidunt fringilla iaculis vitae dictum a quam cras consectetuer interdum odio pellentesque ideros nulla atenim. 
					</p>
				</div><!-- /.archive-description -->
				<div class="filter-container">
					<div class="filter-dropdown">
						<div class="filter-display">
							Filter Your Blog Results to:
							<span class="filter-display-label">
								<?php
									if( single_term_title( '', false ) ){
										single_term_title();
									} else {
										echo 'All';
									}
								?>
							</span>
						</div>
						<ul>
							<li><a href="<?php echo get_permalink( get_option('page_for_posts' ) ); ?>">All</a></li>
							<?php
								$categories = get_categories( array(
									'orderby' => 'name',
									'order'   => 'ASC'
								) );

								foreach( $categories as $category ) {
									$caturl = get_category_link( $category->term_id );
									$catname = $category->name;

									echo '<li><a href="' . $caturl .'">' . $catname. '</a></li>';
								}
							?>
						</ul>
					</div>
				</div>
			</div><!-- /.container container-small -->

			<div class="blog-posts">
				<div class="container">

					<div class="posts">
						<?php while( have_posts() ): the_post(); ?>
							<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
								<a href="<?php the_permalink(); ?>" class="post-link">
									<div class="post-thumbnail" style="background-image: url('<?php echo esc_url( get_the_post_thumbnail_url() ); ?>');">
									</div><!-- /.post-thumbnail -->
									<div class="post-info">
										<h3><?php the_title(); ?></h3>
										<ul class="post-meta">
											<li>01.28.17</li>
											<li><?php the_time( 'F j, Y' ); ?></li>
											<li><?php echo MakespaceFramework::read_time(); ?></li>
										</ul>
									</div><!-- /.post-info -->
									<i class="fa fa-plus-circle" aria-hidden="true"></i>
								</a>
							</article>
						<?php endwhile; ?>
					</div><!-- /.posts -->

				</div><!-- /.container -->
				
				<div class="pagination">
					<?php
						echo paginate_links( array(
							'prev_text' => '<i class="fa fa-angle-up"></i>',
							'next_text' => '<i class="fa fa-angle-down"></i>',
							'type' => 'list'
						) );
					?>
				</div><!-- /.pagination -->
				
			</div><!-- /.blog-posts -->

			
		</section>

		<?php get_template_part( 'template', 'footer-cta' ); ?>

	</main><!-- /.site-main -->

<?php get_footer();


