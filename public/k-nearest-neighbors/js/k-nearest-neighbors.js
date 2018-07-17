var data;
var resultDivs = [];

function preload() {
  data = loadJSON('data/movies.json');
}

function setup() {
  noCanvas();
  var users = {};
  var dropdown1 = createSelect();
  for (var i = 0; i < data.users.length; i++) {
    var name = data.users[i].name;

    dropdown1.option(name);
    users[name] = data.users[i];
  }

  var button = createButton('Submit');
  var resultP = createP();

  button.mousePressed(findNearestNeighbors);

  function findNearestNeighbors() {
    for (var i = 0; i < resultDivs.length; i++) {
      resultDivs[i].remove();
    }
    resultDivs = [];

    var name1 = dropdown1.value();
    var similarityScores = {};
    for(var i = 0; i < data.users.length; i++) {
      var other = data.users[i].name;
      if (other != name1) {
        var similarity = euclideanDistance(other, name1);
        similarityScores[other] = similarity;
      } else {
        similarityScores[other] = -1;
      }
    }

    data.users.sort(compareSimilarity);

    function compareSimilarity(a, b) {
      var score1 = similarityScores[a.name];
      var score2 = similarityScores[b.name];

      return score2 - score1;
    }
    
    var k = 15;
    for (var i = 0; i < k; i++) {
      var name = data.users[i].name;
      var div = createDiv(name + ': ' + similarityScores[name]);
      resultDivs.push(div);
      resultP.parent(div);
    }
  }

  function euclideanDistance(name1, name2) {
    var user1 = users[name1];
    var user2 = users[name2];

    var titles = getTitles(user1);

    var sumSquares = 0;
    for (var i = 0; i < titles.length; i++) {
      var title = titles[i];
      var rating1 = user1[title];
      var rating2 = user2[title];
      if (rating1 != null && rating2 != null) {
        var diff = rating1 - rating2;
        sumSquares += diff * diff;
      }
    }

    var d = Math.sqrt(sumSquares);
    var similarity = 1 / (1 + d);
    return similarity;
  }

  function getTitles(user) {
    var titles = Object.keys(user);
    titles.splice(titles.indexOf("name"), 1);
    titles.splice(titles.indexOf("timestamp"), 1);

    return titles;
  }
}