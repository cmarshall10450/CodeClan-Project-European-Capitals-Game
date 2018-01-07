const MapWrapper = require('./models/MapWrapper');
const Modal = require('./models/Modal');
let countryMap;


const app = function() {
  console.log('App started');
  initialize(48.21, 16.37);
  const modal = new Modal({
    title: 'Where on Earth?',
    body: "The ultimate Country and Capital's game!",
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
  request.get(getScores);
};

const initialize = function(lat, lng) {
  let center = { lat, lng };
  let mapDiv = document.getElementById('map');
  countryMap = new MapWrapper(mapDiv, center, 5);
};

const loadQuestion = function() {
  let question = 'Where is.....';
  createCard(question);
};

const createCard = function(question) {
  const title = document.querySelector('.title');
  title.innerHTML = question + 'China' + '?';
};

document.addEventListener('DOMContentLoaded', app);
