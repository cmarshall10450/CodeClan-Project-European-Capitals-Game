const MapWrapper = require('./MapWrapper');
let countryMap;

const app = function() {
  console.log('App started');
  initialize(48.21, 16.37);
};

const initialize = function(lat, lng) {
  let center = { lat, lng };
  let mapDiv = document.getElementById('map');
  countryMap = new MapWrapper(mapDiv, center, 5);
};


document.addEventListener('DOMContentLoaded', app);
