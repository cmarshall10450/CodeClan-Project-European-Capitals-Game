const request = require('./services/request.js');
// const scoreView = require('./scoreView.js');

const Score = function() {
  this.total = 0;
};

Score.prototype.calculate = function(distance) {
  switch (true) {
    case distance <= 50:
      this.increase(1000);
      return 1000;
    case distance > 50 && distance <= 300:
      this.increase(500);
      return 500;
    case distance > 300 && distance <= 1000:
      this.increase(100);
      return 100;
    case distance > 1000:
      return 0;
  }
};

Score.prototype.getTitle = function(distance) {
  switch (true) {
    case distance <= 50:
      return 'Spot on Mate! Banging!';
    case distance > 50 && distance <= 300:
      return 'Close but nae cigar.';
    case distance > 300 && distance <= 1000:
      return 'Almost pal.';
    case distance > 1000:
      return 'Back tae school wie yae.';
  }
};

Score.prototype.increase = function(score) {
  this.score += score;
};

Score.prototype.getTotal = function() {
  return this.total;
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
