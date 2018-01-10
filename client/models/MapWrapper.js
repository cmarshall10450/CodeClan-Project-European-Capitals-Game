const GoogleMapsLoader = require('google-maps');

const MapWrapper = function(container, coordinates, zoom, callback) {
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
      this.correctMarker = null;

      google.maps.event.addListener(
        this.googleMap,
        'click',
        function(event) {
          if (this.marker) {
            this.marker.setPosition(event.latLng);
          } else {
            this.addMarker(event.latLng);
          }

          const attempt = [event.latLng.lat(), event.latLng.lng()];

          callback(attempt);
        }.bind(this)
      );

      // this.googleMap.disableDragging();
      // whenmaploaded();
      // //if this line hits, the map is loaded.
    }.bind(this)
  );
};

MapWrapper.prototype.addMarker = function(coords) {
  this.marker = new this.google.maps.Marker({
    position: { lat: coords.lat(), lng: coords.lng() },
    map: this.googleMap,
  });
};

MapWrapper.prototype.setCapitalMarker = function(coords) {
  if(this.correctMarker){
    this.correctMarker.setPosition({
      lat: coords[0],
      lng: coords[1]
    });
  } else {
    this.correctMarker = new this.google.maps.Marker({
      position: { lat: coords[0], lng: coords[1] },
      map: this.googleMap,
      icon: {
        url: 'https://lh4.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=w300',
        scaledSize : new google.maps.Size(50,50),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(25,50)
      }
    });
  }
  console.log("Hello");


};


module.exports = MapWrapper;
