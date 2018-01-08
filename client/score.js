const request = require('./services/request.js');
// const scoreView = require('./scoreView.js');

const Score = function() {};

Score.prototype.calculate = function(distance) {
  switch (true) {
    case distance <= 50:
      return 1000;
    case distance > 50 && distance <= 300:
      return 500;
    case distance > 300 && distance <= 1000:
      return 100;
    case distance > 1000:
      return 0;
  }
};

module.exports = Score;

// const body = {
//   score: 0
// };

// const createScore = function(body) {
//  request.post(createRequestComplete, body);
// };

// const createRequestComplete = function(score) {
//  scoreView.addScore(score);
// };

// const getScores = function() {
//  request.get(scoresRequestComplete);
// };

// const scoresRequestComplete = function(allScores) {
//   allScores.forEach(function(score) {
//    scoreView.addQuote(quote);
// });
