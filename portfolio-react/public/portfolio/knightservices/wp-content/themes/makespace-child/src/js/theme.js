(function($){

	var docReady = function() {
		console.log( 'Doc ready!' );
	};

	/*
	* Fix main navigation when video section
	* is not in viewport (used for home page)
	*/
	var fixHeader = function() {
		
		var videoHeight = $('.fake-height').innerHeight();
		var body = $('body');
		var headerHeight = $('.site-header').height() - 10;
		var mainContent = $('.site-main');

	    $(window).on('scroll', function() {

	      if (videoHeight < $(window).scrollTop()) {
	        body.addClass('header-fixed');
	        mainContent.css('margin-top', headerHeight);
	      }
	      else {
	        body.removeClass('header-fixed');
	        mainContent.css('margin-top', 0);
	      }
	    }).trigger('scroll');
	};

	/*
	* Fix pagination at some point and remove
	* fixed position at content bottom
	*/
	var fixPagination = function() {

		var paginationOffsetTop = $('.pagination').offset().top; //get the offset top
		var headerHeight = $('.site-header').innerHeight();

		$(window).scroll(function() { 
		  	var currentPaginationPos = paginationOffsetTop - $(window).scrollTop(); //current distance from top of the window
	     	var paginationHeight = $('.pagination').innerHeight();
			var blogPostsHeight = $('.blog-posts').innerHeight();
		  	var paginationBottomPos = blogPostsHeight - paginationHeight;  
		  	var trigger = $(window).scrollTop() - paginationOffsetTop + headerHeight;

	     	//fix pagination at header bottom position
		    if(currentPaginationPos <= headerHeight) {

		     	$('.pagination').addClass('is-fixed');

		     } else {

		     	$('.pagination').removeClass('is-fixed');
		     }

		    //remove fixed position at blog posts bottom
		    if ( trigger  >= paginationBottomPos) {

		    	$('.pagination').addClass('bottom');

		    } else {

		    	$('.pagination').removeClass('bottom');
		    }
	  });

	};

	//Home page sub menu opening direction (top or bottom)
	var homeSubmenuOpenDirection = function() {

		$('.menu-item-has-children').on('mouseenter', function(e) {
			var mainNavOffset = $('.site-header').offset().top; // header offset from top
			var submenuHeight = e.target.nextElementSibling.scrollHeight; //get height of submenu after opening
			var currNavOpenedOffset = mainNavOffset - ($(window).scrollTop() + submenuHeight);

			if (currNavOpenedOffset <= 0) {

				$('body').addClass('menu-bottom');

			} else {

				$('body').removeClass('menu-bottom');
			}
		});		
	};

	//Posts slider (home page)
	var postsSlider = function() {

		$( '.posts-slider' ).slick({
			infinite: true,
			slidesToShow: 2,
			nextArrow: '<button type="button" class="next-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
			prevArrow: '<button type="button" class="prev-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
			cssEase: 'ease-in-out',
			speed: 600,
			responsive: [
			  {
			    breakpoint: 640,
			    settings: {
			     	slidesToShow: 1,
			     	autoplay: true,
			     	arrows: false
			    }
			  }
			]
		});
	};

	//Open locally stored video in popup
	var videoPopup = function() {
		$('.open-popup-link').magnificPopup({
		    type: 'inline',
		    callbacks: {
		        open: function() {

		            // https://github.com/dimsemenov/Magnific-Popup/issues/125
		            $('html').css('margin-right', 0);

		            // Play video on open:
		            $(this.content).find('video')[0].play();

		        },
		        close: function() {

		            // Reset video on close:
		            $(this.content).find('video')[0].load();

		        }
		    }
		});
	};


	$(document).ready(function(){
		docReady();

		if ($('.posts-slider').length) {
			postsSlider();
		}

		if ($('.home').length) {
			videoPopup();
			fixHeader();
			homeSubmenuOpenDirection();
		}

		if ($('.blog, .archive').length) {
			fixPagination();
		}


		
	});
	

})(jQuery);