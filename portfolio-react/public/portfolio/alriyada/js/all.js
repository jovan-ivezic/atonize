// //map for contact page
function contactmap() {
    var map;
    var bounds = new google.maps.LatLngBounds();
  
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map-contact"));
    map.setTilt(45);
    map.setOptions({
      scrollwheel: false,
      zoom: 14,
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    }); 
  
    // Multiple Markers
    var markers = [
        ['Libya', 32.883535, 13.164429],
        ['Libya', 32.883535, 13.164429]
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        [document.getElementById("marker-contact-1")]

    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < 1; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            icon:'images/map-marker.png'
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }


    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map),'bounds_changed', function(event) {
        this.setZoom(17);
        google.maps.event.removeListener(boundsListener);
    });
}



//map for wifi-map page
var markers = [];
function wifimap() {

    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(32.887621, 13.187477),
        scrollwheel: false,
        mapTypeId: 'roadmap',
        disableDefaultUI: true
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);


    var locations = [
        ['<div class="marker-wifi"><h3>1 ميدان الجزائر</h3><p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على</p><div>', 32.887621, 13.187477],
        ['<div class="marker-wifi"><h3>2 يدان الجزائر</h3><p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على</p><div>', 32.867621, 13.187477],
        ['<div class="marker-wifi"><h3>3 ميدان الجزائر</h3><p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على</p><div>', 32.877621, 13.187477],
        ['<div class="marker-wifi"><h3>4 ميدان الجزائر</h3><p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على</p><div>', 32.847621, 13.187477]
    ];


    var marker, i;
    var infowindow = new google.maps.InfoWindow();


    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });


    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: 'images/map-marker.png'
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
                map.setZoom(16);
                map.setCenter(marker.getPosition())
            }
        })(marker, i));

        markers.push(marker);
    }

}
// google.maps.event.addDomListener(window, 'load', wifimap);

function myClick(id){
    google.maps.event.trigger(markers[id], 'click');
}
