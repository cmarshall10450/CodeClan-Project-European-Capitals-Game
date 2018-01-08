const MapWrapper = require('./models/MapWrapper');
const Modal = require('./models/Modal');
const Score = require('./score');
const Request = require('./services/request');
const geojson = require('geojson-tools');

let countryMap;
let country;
let modal;

const MAX_QUESTIONS = 5;

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

  const playerScore = new Score();
  countryMap = new MapWrapper(mapDiv, center, 5, function(attempt) {
    const countryLocation = [
      country.geometry.coordinates[1],
      country.geometry.coordinates[0],
    ];

    const distance = geojson.getDistance([attempt, countryLocation]);

    modal.set({
      title: playerScore.getTitle(distance),
      body: `
        <p>${distance} km away.</p>
        <p>You scored <span>${playerScore.calculate(distance)}</span></p>
        <p>Your total so far is <span>${playerScore.getTotal()}</span></p>
        <p class='background-fact'>${country.history}</p>
      `,
      buttons: {
        action: {
          label: 'Next',
          fn: function() {
            modal.hide();
            loadQuestion();
          },
        },
      },
    });
    modal.show();
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
