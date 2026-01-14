
<?php get_header(); ?>

	<main class="site-main" role="main">
		
		<?php get_template_part( 'template', 'header' ); ?>

		<section>
			<div class="container container-small">
				<?php while( have_posts() ): the_post(); ?>
					<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
						<header class="entry-header">
							<h1 class="entry-title"><?php the_title(); ?></h1>
							<ul class="post-meta">
								<li><?php the_time( 'F j, Y' ); ?></li>
								<li><?php echo MakespaceFramework::read_time(); ?></li>
							</ul>
						</header>
						<div class="entry-content">
							<?php the_content(); ?>
						</div><!-- /.entry-content -->
						<footer>
							<div class="category-list">
								<?php echo get_the_category_list( ' ' ); ?>
							</div>
							<div class="addtoany-share">
								<h2>Share This Article</h2>
								<?php if ( function_exists( 'ADDTOANY_SHARE_SAVE_KIT' ) ) { ADDTOANY_SHARE_SAVE_KIT(); } ?>
							</div><!-- /.addtoany-share -->
							<ul class="post-nav">
								<li class="item prev">
									<?php if( get_previous_post() ): $prev = get_previous_post(); ?>
										<a href="<?php echo get_permalink( $prev->ID ); ?>">
										<i class="fa fa-angle-left" aria-hidden="true"></i>Previous Article</a>
									<?php endif; ?>
								</li>
								<li class="back-to-all">
									<a href="<?php echo get_permalink(get_option('page_for_posts')); ?>">Back to blog</a>
								</li>
								<li class="item next">
									<?php if( get_next_post() ): $next = get_next_post(); ?>
									<a href="<?php echo get_permalink( $next->ID ); ?>">Next Article<i class="fa fa-angle-right" aria-hidden="true"></i></a>
									<?php endif; ?>
								</li>
							</ul>
						</footer>
					</article>
				<?php endwhile; ?>
			</div><!-- /.container container-small -->
		</section>

		<?php get_template_part( 'template', 'footer-cta' ); ?>

	</main><!-- /.site-main -->

<?php get_footer();