(function($){

	var docReady = function(){
		console.log( 'Doc ready!' );
	};

	var menuTrigger = function() {
		$('.menu-open, .menu-close').on('click', function() {
			$('html').toggleClass('menu-active');
		});
	};

	var magnificPopup = function() {
		$( '.portfolio-gallery-link' ).magnificPopup({
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			}
		
		});
	}

	var projectSlider = function() {
		$( '.slider' ).slick({
			infinite: true,
			slidesToShow: 1,
			arrows: true,
			nextArrow: '<button type="button" class="next-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
			prevArrow: '<button type="button" class="prev-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
			cssEase: 'ease-in-out',
			speed: 600,
			appendArrows: $('.arrows')
		});
	}

	// Google contact map.
	var initMap = function() {
		var map_container = document.getElementById('cd-map');
		var uluru = {lat: parseFloat(map_container.dataset.lat), lng: parseFloat(map_container.dataset.lng)};
		
		map = new google.maps.Map(map_container, {
			draggable: false,
			mapTypeControl: false,
			scrollwheel: false,
			disableDefaultUI: true,
			center: uluru,
			zoom: 15
		});

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(parseFloat(map_container.dataset.lat), parseFloat(map_container.dataset.lng)),
			icon: MSWObject.marker_url,
			map: map
		});

		google.maps.event.addDomListener(window, 'resize', function() {
			map.setCenter( uluru );
		});		
	};

	$(document).ready(function(){
		docReady();

		menuTrigger();

		if($('.projects-slider').length) {
			projectSlider();
		}

		if($('.portfolio-gallery-link').length) {
			magnificPopup();
		}


		if($('.location-map').length) {
			initMap();
		}
	});

})(jQuery);