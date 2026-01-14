'use strict';

var $ = window.jQuery;

/**
 * Admin bar gets very annoying overlapping with
 * fixed header
 */

//ON DOCUMENT READY
$(document).ready(function() {

	//COUNTER
  	if ($('.counter').length) {
       	$('.counter').countdown('2020/05/30', function(event) {
        	$(this).html(event.strftime('<div class="counter-item">%D <span>days</span></div> <div class="counter-item">%H <span>hours</span></div> <div class="counter-item">%M <span>minute</span></div> <div class="counter-item">%S <span>seconds</span></div>'));
      	});
  	}

  	//MAGNIFIC
  	$('#map-1').magnificPopup({
      type:'inline',
      closeBtnInside: true,
      mainClass: 'my-mfp-fade-move',
      removalDelay: 300,
      midClick: true,
      callbacks: {
      open: function() {
          if (map.length) {
            initMap(51.571408, -1.122991, 'Ceremony');
          } 
        }
      }
    });

    $('#map-2').magnificPopup({
      type:'inline',
      closeBtnInside: true,
      mainClass: 'my-mfp-fade-move',
      removalDelay: 300,
      midClick: true,
      callbacks: {
      open: function() {
          if (map.length) {
            initMap(51.558655, -0.951083, 'Reception');
          } 
        }
      }
    });

    /**
     * Sliders
     */
    if ($('.slider-1').length) {
      $('.slider-1').owlCarousel({
        items: 5,
        loop: false,
        nav: true,
        navText: ["<svg role='img' class='icon icon-arrow'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='icons/icons.svg#icon-arrow'></use></svg>", "<svg role='img' class='icon icon-arrow'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='icons/icons.svg#icon-arrow'></use></svg>"],
        margin:0,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          501: {
            items: 2,
            nav: false
          },
          750: {
            items: 2
          },
          768: {
            items: 3
          },
          1060: {
            items: 4
          },
          1440: {
            items: 5
          }
        }
      });
    }

    if ($('.slider-2').length) {
      $('.slider-2').owlCarousel({
        items: 6,
        loop: false,
        nav: true,
        navText: ["<svg role='img' class='icon icon-arrow'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='icons/icons.svg#icon-arrow'></use></svg>", "<svg role='img' class='icon icon-arrow'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='icons/icons.svg#icon-arrow'></use></svg>"],
        margin:0,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          1060: {
            items: 3
          },
          1270: {
            items: 6
          }
        }
      });
    }

});


//WINDOW ONLOAD
$(window).load(function() {

  // WINDOW RESIZE
  $(window).on('resize', function() {

  }).trigger('resize');

});

function initMap(lat, long, string) {
  var myLatlng = new google.maps.LatLng(lat, long);
  var mapOptions = {
    zoom: 14,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
        animation: google.maps.Animation.DROP,
        scrollwheel: false
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  //Callout Content
  var contentString = string;

  //Set window width + content
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 500
  });

  var markers = [];

  //Add Marker
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: 'images/map/marker.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
    map.setZoom(16);
  });

  markers.push(marker);

  //Resize Function
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
}