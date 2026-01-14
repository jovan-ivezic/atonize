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
				</div>
			</div>
		<?php endif; ?>
		<ul class="top-contact">
			<?php $contact = get_field( 'contact_information', 'option' )[0]; ?>
			<li>
				Contact Joe: <a href="tel:<?php echo esc_html( $contact[ 'phone_number' ] ); ?>"><?php echo esc_html( $contact[ 'phone_number' ] ); ?></a>
			</li>
			<li>
				<a href="mailto:<?php echo esc_html( $contact[ 'email_address' ] ); ?>"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
			</li>
			<li>
				<a href="javascript:;">Client Portal</a>
			</li>
		</ul><!-- /.top-contact -->

		<header class="site-header">
			
			<div class="menu-trigger">
				<button type="button" class="menu-open"></button>
				<a href="<?php echo home_url(); ?>" title="<?php bloginfo( 'name' ); ?>" class="brand">
					<img src="<?php the_field( 'site_logo', 'option' ); ?>" alt="<?php bloginfo( 'name' ); ?>">
				</a>
			</div><!-- /.menu-trigger -->

			<div class="nav-menu">
				<div class="menu-trigger-close">
					<button type="button" class="menu-close"></button>
					<a href="<?php echo home_url(); ?>" title="<?php bloginfo( 'name' ); ?>" class="brand">
					</a>
				</div><!-- /.menu-trigger-close -->
				<?php
					wp_nav_menu( array(
						'container' => 'nav',
						'container_id' => 'large-nav-primary',
						'theme_location' => 'primary'
					) );
				?>
				<div class="menu-info">
					<a href="javascript:;" class="button">Client portal</a>
					<a href="tel:<?php echo esc_html( $contact[ 'phone_number' ] ); ?>" class="tel"><?php echo esc_html( $contact[ 'phone_number' ] ); ?></a>
					<a href="mailto:<?php echo esc_html( $contact[ 'email_address' ] ); ?>"><?php echo esc_html( $contact[ 'email_address' ] ); ?></a>
					<div class="social-icons">
						<a href="javascript:;">
							<i class="fa fa-facebook-official" aria-hidden="true"></i>
						</a>
						<a href="javascript:;">
							<i class="fa fa-youtube-square" aria-hidden="true"></i>
						</a>
					</div><!-- /.social-icons -->
				</div><!-- /.menu-info -->
			</div><!-- /.nav-menu -->
			
			<?php
				if( 'dropdown' == get_field( 'menu_type', 'option' ) ){
					wp_nav_menu( array(
						'container' => 'nav',
						'container_id' => 'dropdown-nav-primary',
						'theme_location' => 'primary'
					) );
				}
			?>
		</header><!-- /.site-header -->