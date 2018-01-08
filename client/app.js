const MapWrapper = require('./models/MapWrapper');
const Modal = require('./models/Modal');
const Request = require('./services/request');
const geojson = require('geojson-tools');
let countryMap;
let country;
let modal;

const app = function() {
  console.log('App started');
  initialize(48.21, 16.37);
  modal = new Modal({
    title: 'Where on Earth? (Europe Edition)',
    body:
      "The ultimate Country and Capital's game!" +
      '<p> Guess where the capitals are to win big and learn some fun facts. </p>' +
      '<h1> How to play </h1>' +
      '<p> 1) Press the start button below. </p>' +
      '<p> 2) When the game starts a city name will show, try and find it on the map. </p>' +
      '<p> 3) Click and place your marker where you think it is. </p>' +
      '<p> 4) See how close you got and your score. </p>',
    buttons: {
      action: {
        label: 'Start Game',
        fn: function() {
          loadQuestion();
          modal.hide();
        },
      },
    },
  });
  modal.show();
  // request.get(getScores);
};

const initialize = function(lat, lng) {
  let center = { lat, lng };
  let mapDiv = document.getElementById('map');
  countryMap = new MapWrapper(mapDiv, center, 5, function(attempt) {
    console.log(attempt);
    const countryLocation = [
      country.geometry.coordinates[1],
      country.geometry.coordinates[0],
    ];
  });
};

const loadQuestion = function() {
  let question = 'Where is.....';

  const request = new Request();
  const randomCountry = request.getRandomCountry(function(countryInfo) {
    createCard(countryInfo);
    country = countryInfo;
  });
};

const createCard = function(country) {
  const title = document.querySelector('.title');
  title.innerHTML = 'Where is ' + country.properties.capital + '?';
};

document.addEventListener('DOMContentLoaded', app);
