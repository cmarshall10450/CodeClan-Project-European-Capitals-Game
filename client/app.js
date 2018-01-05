const MapWrapper = require('./MapWrapper');

const app = function() {
  console.log('App started');
  initialize(48.21, 16.37);
};

const initialize = function(lat, lng) {
  let center = { lat, lng };
  let mapDiv = document.getElementById('map');
  let countryMap = new MapWrapper(mapDiv, center, 5);
};

document.addEventListener('DOMContentLoaded', app);
