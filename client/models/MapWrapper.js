const GoogleMapsLoader = require('google-maps');

const MapWrapper = function(container, coordinates, zoom) {
  GoogleMapsLoader.load(
    function(google) {
      this.google = google; //google object.
      this.googleMap = new google.maps.Map(container, {
        center: coordinates,
        zoom: zoom,
        styles: [
          { elementType: 'labels', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'administrative.land_parcel',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative.neighborhood',
            stylers: [{ visibility: 'off' }],
          },
          { featureType: 'road', stylers: [{ visibility: 'off' }] },
        ],
      });
      this.marker = null;

      google.maps.event.addListener(this.googleMap, 'click', function(event) {
       if (this.marker) {
        this.marker.setPosition(event.latLng);
       } else {
        this.addMarker(event.latLng);
       }
       console.log(event.latLng.lat());
       console.log(event.latLng.lng());
      }.bind(this));




      // this.googleMap.disableDragging();
      // whenmaploaded();
      // //if this line hits, the map is loaded.
    }.bind(this)


  );
};

MapWrapper.prototype.addMarker = function(coords) {
  this.marker = new this.google.maps.Marker({
    position: {lat: coords.lat(), lng: coords.lng()},
    map: this.googleMap
  });


};

module.exports = MapWrapper;
