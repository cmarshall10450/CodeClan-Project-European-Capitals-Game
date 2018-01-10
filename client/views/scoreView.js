const scoreView = function() {
 this.scores = [];
};

scoreView.prototype.addScore = function(score) {
 this.scores.push(score);
};

scoreView.prototype.createLeaderboard = function(scores) {
  const table = `
  <h1 id="score-board">Name : Score<h1>
  ${populateScores(scores)}
 `;
 return table;
};

scoreView.prototype.populateScores = function(scores) {
  let scoreList = "";
  scores.forEach(function(score){
    scoreList += `<p>${score.name} : ${score.score}</p>`
  });
  return scoreList;
};

module.exports = scoreView;
