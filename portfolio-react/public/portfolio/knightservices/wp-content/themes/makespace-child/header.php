<!DOCTYPE html>
<html lang="en-US" class="no-js">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<?php wp_head(); ?>
		<!--[if lt IE 9]>
			<script src="//oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
			<script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body <?php body_class(); ?>>
		<?php if( 'ocn' == get_field( 'menu_type', 'option' ) ): ?>
			<div id="ocn">
				<div id="ocn-inner">
					<div id="ocn-top">
						<a href="<?php echo home_url(); ?>" title="<?php bloginfo( 'name' ); ?>" id="ocn-brand">
							<img src="<?php the_field( 'site_logo', 'option' ); ?>" alt="<?php bloginfo( 'name' ); ?>">
						</a>
						<button class="nav-toggle" type="button" id="ocn-close">
							<span></span>
						</button>
					</div>
					<?php wp_nav_menu( array(
						'container' => 'nav',
						'container_id' => 'ocn-nav-primary',
						'theme_location' => 'primary',
						'before' => '<span class="ocn-link-wrap">',
						'after' => '<span class="ocn-sub-menu-button"></span></span>'
					) ); ?>

					<?php
						wp_nav_menu( array(
							'container' => 'nav',
							'container_id' => 'ocn-nav-primary',
							'theme_location' => 'secondary',
							'before' => '<span class="ocn-link-wrap">',
							'after' => '<span class="ocn-sub-menu-button"></span></span>'
						) );
					?>
				</div>
			</div>
		<?php endif; ?>

		<div class="home-video">
			<div class="video-background">
				<video class="" autoplay muted loop poster="<?php echo get_stylesheet_directory_uri(); ?>/assets/intro-video.jpg">
			    	<source src="<?php echo get_stylesheet_directory_uri(); ?>/assets/intro-video.mp4" type="video/mp4">
			    	<source src="<?php echo get_stylesheet_directory_uri(); ?>/assets/intro-video.ogv" type="video/ogg">
			    	<source src="" type="video/webm">
			  	</video>
			</div><!-- /.video-background -->

			<div class="letter-background">
				<a href="#video-full" class="open-popup-link">
					<i class="fa fa-play-circle" aria-hidden="true"></i>
					Let the Show Begin
				</a>
				<div id="video-full" class="video-popup mfp-hide">
				    <video preload="auto" controls poster="<?php echo get_stylesheet_directory_uri(); ?>/assets/intro-video.jpg">
				       <source src="<?php echo get_stylesheet_directory_uri(); ?>/assets/intro-video.mp4" type="video/mp4">
				    </video>
				</div> <!-- /.video-popup (hidden element) -->
			</div><!-- /.letter-background -->

			<div class="fake-height"></div><!-- Fake element used to obtain the same height as a video (fixed element) -->
		</div><!-- /.home-video -->
		
		<header class="site-header">
			<div class="site-nav">
				<?php
					wp_nav_menu( array(
						'container' => 'nav',
						'container_id' => 'large-nav-primary',
						'theme_location' => 'primary'
					) );
				?>
					
				<a href="<?php echo home_url(); ?>" title="<?php bloginfo( 'name' ); ?>" class="brand">
					<img src="<?php the_field( 'site_logo', 'option' ); ?>" class="brand-logo" alt="<?php bloginfo( 'name' ); ?>">
					<span class="brand-name">Knight Services</span>
				</a>

				<?php
					wp_nav_menu( array(
						'container' => 'nav',
						'container_id' => 'large-nav-secondary',
						'theme_location' => 'secondary'
					) );
				?>
				<button class="nav-toggle" type="button" id="nav-toggle">
					<span></span>
				</button>
			</div>
			<?php
				if( 'dropdown' == get_field( 'menu_type', 'option' ) ){
					wp_nav_menu( array(
						'container' => 'nav',
						'container_id' => 'dropdown-nav-primary',
						'theme_location' => 'primary'
					) );

					wp_nav_menu( array(
						'container' => 'nav',
						'container_id' => 'large-nav-primary',
						'theme_location' => 'secondary'
					) );
				}
			?>
		</header>