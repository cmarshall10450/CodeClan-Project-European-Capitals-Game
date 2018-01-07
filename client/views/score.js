let scores = [];

const requestComplete = function() {
 request.get(getScores);
}

const getScores = function(allScores)  {
 allScores.forEach(function(score) {
    scores.push(score);
  });
}
