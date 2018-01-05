const GoogleMapsLoader = require('google-maps');

const MapWrapper = function(container, coordinates, zoom, whenmaploaded) {
  GoogleMapsLoader.load(
    function(google) {
      this.google = google; //google object.
      this.googleMap = new google.maps.Map(container, {
        center: coordinates,
        zoom: zoom,
      });
      this.markers = [];

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
