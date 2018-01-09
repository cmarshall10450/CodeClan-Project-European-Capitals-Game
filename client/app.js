const MapWrapper = require('./models/MapWrapper');
const Modal = require('./models/Modal');
const Score = require('./score');
const Request = require('./services/request');
const geojson = require('geojson-tools');

let countryMap;
let country;
let modal;
let playerScore;
let playerName;

const MAX_QUESTIONS = 5;
let questionCount = 0;

const app = function() {
  console.log('App started');
  initialize(48.21, 16.37);
  modal = new Modal({
    title: 'Where on Earth? (Europe Edition)',
    body:
      "<div id='sub-title'><p>The ultimate Country and Capital's game!</p>" +
      '<p> Guess where the capitals are to win big and learn some fun facts. </p></div>' +
      '<h1> How to play </h1>' +
      '<p> 1) Enter your name then press the start button below. </p>' +
      '<p> 2) When the game starts a city name will show, try and find it on the map. </p>' +
      '<p> 3) Click and place your marker where you think it is. </p>' +
      '<p> 4) See how close you got and your score. </p>' +
      "<form><input id='name' placeholder='Enter name here'></form>",
    buttons: {
      action: {
        label: 'Start Game',
        fn: function() {
          playerName = document.querySelector('#name').value;
          playerScore = new Score(playerName);
          console.log(playerScore);
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
  questionCount = 0;
  getScores();


  countryMap = new MapWrapper(mapDiv, center, 5, function(attempt) {
    if (questionCount < MAX_QUESTIONS){


      const countryLocation = [
        country.geometry.coordinates[1],
        country.geometry.coordinates[0],
      ];

      const distance = geojson.getDistance([attempt, countryLocation]);

      // countryMap.addMarker(countryLocation);

      modal.set({
        title: playerScore.getTitle(distance),
        body: `
          <img src='${country.images[0]}'/>
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
              questionCount++;
              if (questionCount === MAX_QUESTIONS){
                gameEnd(playerScore.getTotal());
                return;
              }
              loadQuestion();
              console.log(questionCount);
            },
          },
        },
      });
      modal.show();
    }
    else{
      console.log("Game over");
    }
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

const gameEnd = function(score){
  modal.set({
    title: "Game Over!",
    body: `<p id='score-title'>Score</p> <p id='final-score'>${score}</p>`,
    buttons: {
      action: {
        label: "Play Again?",
        fn: function(){
          modal.hide();
          initialize(48.21, 16.37);
        }
      },
      close: {
        label: "Show Scores",
        fn: function(){
          getScores()
          console.log("hfhyf");
        }
      }

    }
  });
  playerScore.saveScore();
  console.log(playerScore);
  modal.show();
};

const getScores =function(){
  const request = new Request("http://localhost:5000/api/scores");
  request.get(function(body){
    console.log(body);
  });
};


document.addEventListener('DOMContentLoaded', app);
