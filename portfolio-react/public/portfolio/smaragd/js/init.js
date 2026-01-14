//INIT WATERMARK
function initWatermark() {
    $.watermark.options = {
      className: 'input--placeholder',
      useNative: false
    };
 
    //INPUT PLACEHOLDER
    $("[placeholder]").each(function() {
        $(this).watermark($(this).attr("placeholder"));
    });
    $("[type=password]").blur();
}

$(window).load(function() {
  $("#preloader").fadeOut("slow");
});

$(document).ready( function () {


    //detect iOS
    var ua = navigator.userAgent.toLowerCase();
      function removeSpaces(ua) {
        return ua.split(' ').join('');
      }
    ua = removeSpaces(ua);
    var iOS = ua.match(/(iphone|ipod|ipad)/);
      if(iOS) {
        $('html').addClass('iOS');
      }

    // initialize autosize script
    $('textarea').autosize();

    //sticky footer trick
    var bumpIt = function() {
          $('body').css('margin-bottom', $('.footer-main').outerHeight());
        },
        didResize = false;

    bumpIt();

    $(window).resize(function() {
      didResize = true;
    });
    setInterval(function() {
      if(didResize) {
        didResize = false;
        bumpIt();
      }
    }, 250);

    //on resize run function
    var tOut = false;
    var milSec = 500;
    $(window).resize(function(){
     if(tOut !== false)
        clearTimeout(tOut);
     tOut = setTimeout(rsizeItems, milSec);
    });
    function rsizeItems()
    {
        //put code inside this function
    }

    //detect window resize
    $(window).on('resize', function() {
      //put scripts inside
    }).trigger('resize');

    //detect page scroll
    $(window).on('scroll', function() {
      //put scripts inside
    }).trigger('scroll');

    //INIT WATERMARK
    initWatermark();

    //FLEX SLIDER HOMEPAGE

  if ($('.flexslider').length) {
    $('.flexslider').flexslider({
        slideshow: true,
        animation: "slide",
        animationSpeed: 1800,
        controlNav:false,
        touch: true,
        prevText: "",
        nextText: ""
      });
  }
     
       $('.bgr-wrap').each(function(){
            var src = $(this).find('.bgr-img').attr('src');
            $(this).css('backgroundImage', 'url('+ src +')');
            $(this).find('.bgr-img').hide();
      });

       //OWL SLIDER REVIEWS
      if ($('.review-slides').length) {
          $(".review-slides").owlCarousel({
             loop:true,
             margin:10,
             responsive: true,
             items:1,
             nav:true,
             navText: ''
           });
      }

       

  //CONTACT FORM VALIDATION

  if ($('#contact-form').length) {
      $('#contact-form').validate({
          errorElement: 'div',
          errorClass: 'error',
          rules: {
              name: "required",
              subject: "required",
              mail: {
                  required: true,
                  email: true
              },
              message: "required"
          },
          messages: {
              name: "Please enter your name",
              email: {
                  required: "Please enter your email",
                  email: "Valid email is required"
              }
          }
          ,
          submitHandler: function(form) {

              $.ajax({
                  url: 'form_data.php',
                  type: 'POST',
                  dataType: 'json',
                  data: {
                    name: $('#name').val(),
                    mail: $('#mail').val(),
                    subject: $('#subject').val(),
                    message: $('#message').val()
                  },
                  success: function(response) {
                      if(response.status === true) {
                          alert('Uspešno ste poslali poruku! Odgovorićemo u najkraćem roku.')
                      } else {
                          alert('Greška u slanju mail-a ...')
                      }
                  }
              });
          }
      });
  }


     
    //END VALIDATION


});

