const request = require('./request.js');
const scoreView = require('./scoreView.js')

const body = {
  score: 1
};

const createRequestComplete = function(score) {
 scoreView.addScore(score);
}

const createScore = function(body) {
 request.post(createRequestComplete, body);
}
