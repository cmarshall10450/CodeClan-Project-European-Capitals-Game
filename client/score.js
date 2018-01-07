const request = require('./request.js');
const scoreView = require('./scoreView.js')

const body = {
  score: 0
};

const createScore = function(body) {
 request.post(createRequestComplete, body);
};

const createRequestComplete = function(score) {
 scoreView.addScore(score);
};

const getScores = function() {
 request.get(scoresRequestComplete);
};

const scoresRequestComplete = function(allScores) {
  allScores.forEach(function(score) {
   scoreView.addQuote(quote);
});
