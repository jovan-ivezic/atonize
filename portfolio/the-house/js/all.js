// QUOTE FORM
$(function () {
    
    var showError = function( element ) {
        $( element ).addClass( 'input--error' ).siblings( 'span' ).css( 'opacity', '0' ).siblings( '.error' ).addClass( 'is-active' );
	    $( 'input[type="submit"]' ).prop( 'disabled', 'true' );
    };
    
    var hideError = function( element, enable ) {
        $( element ).removeClass( 'input--error' ).siblings( 'span' ).css( 'opacity', '1' ).siblings( '.error' ).removeClass( 'is-active' );
        if ( enable === true ) {
            $( 'input[type="submit"]' ).removeAttr( 'disabled' );
        }
    };
    
    var validateEmpty = function() {
        if ( $( '#field-email' ).val() === "" ) {
            console.log( '... errors found' );
            $( '#field-email' ).blur();
            return false;
        }
        return true;
    };
    
    //QUOTE FORM - EMAIL VALIDATION
	$( '#field-email' ).blur( function() {
	    var value     = $(this).val();
	    var is_valid  = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	    if ( !is_valid.test( value ) || value.length === 0 ) { 
	      	showError( this );
	    } else {
	      	hideError( this, true );
	    }
	} );
	$( '#field-email' ).focusin( function() {
		hideError( this );
	} );
    
	// get a quote form
    $( '#quote-submit' ).click(function ( e ) {
        
        e.preventDefault();
        
        var valid = validateEmpty();
        
        if ( valid === false ) {
            return false;
        }
        
        // validate and process form here
        $( '#quote-form .tooltip' ).hide();

        var fullname = $( '#field-fullname' ).val();
        var email = $( '#field-email' ).val();
        var phone = $( '#field-phone' ).val();
        var company = $( '#field-company' ).val();
        var budget = $( '#select-budget' ).val();
        var deadline = $( '#field-deadline' ).val();
        var message = $( '#field-message' ).val();

        var dataString =
                'fullname=' + fullname +
                '&email=' + email +
                '&phone=' + phone +
                '&company=' + company +
                '&budget=' + budget +
                '&deadline=' + deadline +
                '&message=' + message;

        var response = $.ajax( {
            type: 'POST',
            url: '/wp-content/themes/the_house/quote-process.php',
            data: dataString,
            success: function () {
                $( '.quote-form' ).parent().addClass( 'successful-submit' );
            }
        } );

        return false;
    });
    
    // newsletter subscribe
    $( '.subscribe .btn--submit' ).on('click', function(e) {
		$(this).parents('.subscribe' ).addClass('successful-submit' );
	});
});