'use strict';

var $ = window.jQuery;

//ON DOCUMENT READY
$(document).ready(function() {

}); //end of document ready



//WINDOW ONLOAD
$(window).load(function() {

  var $container = $('.grid').isotope();

  if ($('.grid').length) {
    $('.grid').isotope(); //solve problem with initial grid height with responsive elements
  }
    
  
  //on page load add class is-active to the first filter option
  $('.filter-nav li:first button').addClass('is-active');

  // filter items on button click, add class active on selected item
  $('#filters').on( 'click', 'button', function() {
      var $this = $(this);
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
      $this.addClass('is-active').parent().siblings().find('button').removeClass('is-active');
  });

  var $filterButtons = $('.filter .filter-button');

  //masonry function for update filter count
  function updateFilterCounts()  {
    // get filtered item elements
    var itemElems = $container.isotope('getFilteredItemElements');
    var $itemElems = $( itemElems );
    $filterButtons.each( function( i, button ) {
      var $button = $( button );
      var filterValue = $button.attr('data-filter');
      if ( !filterValue ) {
        // do not update 'any' buttons
        return;
      }
      var count = $itemElems.filter( filterValue ).length;
      $button.find('.filter-count').text(count);
    });
  }

  updateFilterCounts();

  // WINDOW RESIZE
  $(window).on('resize', function() {


  }).trigger('resize');

});




'use strict';

var $ = window.jQuery;

//ON DOCUMENT READY
$(document).ready(function() {

	//img slider
	if ($('.img-slider').length) { 
		$('.img-slider').owlCarousel({
			items: 1,
			nav: true,
			navText: [ '<svg role="img" class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="icons/icons.svg#icon-arrow-left"></use></svg>',
	                  '<svg role="img" class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="icons/icons.svg#icon-arrow-right"></use></svg>'
	        ],
			dots: true
		});
	}

	//img slider with caption
	if ($('.img-slider-caption').length) { 
		$('.img-slider-caption').owlCarousel({
			items: 1,
			nav: true,
			loop: true,
			navText: [ "<svg role='img' class='icon icon-arrow-left'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='icons/icons.svg#icon-arrow-left'></use></svg>",
	                  "<svg role='img' class='icon icon-arrow-right'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='icons/icons.svg#icon-arrow-right'></use></svg>"
	        ],
			dots: true,
			onChange: subtitleCallback,
			afterInit:subtitleCallback
		});
	}

	//media slider 
	if ($('.media-slider').length) {
		$('.media-slider').on('initialized.owl.carousel changed.owl.carousel', function(e) {
		    if (!e.namespace)  {
		      return;
		    }
		    var carousel = e.relatedTarget;
		    $('.media-slider-count').text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
		  }).owlCarousel({
		    items: 1,
			nav: true,
			navText: [ "<svg role='img' class='icon icon-arrow-left'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='icons/icons.svg#icon-arrow-left'></use></svg>",
	                  "<svg role='img' class='icon icon-arrow-right'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='icons/icons.svg#icon-arrow-right'></use></svg>"
	        ],
	    	animateOut: 'fadeOut'
			// smartSpeed: 1000
		  });
	}

	
}); //end of document ready


//get picture subtitle for slider
function subtitleCallback(event){
	setTimeout(function(){
		var subtitle_content = $('.img-slider-caption .owl-item.active .picture-subtitle').html();
		$('.subtitle-text').html(subtitle_content);
	}, 1 );
}