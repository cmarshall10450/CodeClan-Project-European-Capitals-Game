const newsView = function() {
 this.news = [];

 newsView.prototype.createNewsboard = function(news) {
  // <h1 id="news-board">Latest News<h1>
  const table = `
  ${populateNews(news.articles)}
  `;
  return table;
 };

 const populateNews = function(news) {
   let newsList = "";
   news.forEach(function(thisNew){
     newsList += `<p>${thisNew.title} : <a href=${thisNew.url}>see more</a></p>`
   });
   return newsList;
 };

};
