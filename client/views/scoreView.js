const scoreView = function() {
 this.scores = [];
}

scoreView.prototype.addScore = function(score) {
 this.scores.push(score);
}

module.exports = scoreView;
