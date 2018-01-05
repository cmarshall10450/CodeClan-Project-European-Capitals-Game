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
      this.markers = [];

      this.googleMap.disableDragging();
      // whenmaploaded();
      // //if this line hits, the map is loaded.
    }.bind(this)
  );
};

MapWrapper.prototype.addMarker = function(coords) {
  var marker = new this.google.maps.Marker({
    position: coords,
    map: this.googleMap,
  });
};

module.exports = MapWrapper;
