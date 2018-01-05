const MapWrapper = require('./MapWrapper');

const app = function() {
  console.log('App started');
  initialize();
};

const initialize = function(latlng) {
  let center = { lat: 0, lng: 0 };
  let mapDiv = document.getElementById('map');
  let countryMap = new MapWrapper(mapDiv, center, 10);
};

document.addEventListener('DOMContentLoaded', app);
