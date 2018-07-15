var data;

function preload() {
  data = loadJSON('data/movies.json');
}

function setup() {
  noCanvas();
  var users = {};
  var dropdown1 = createSelect();
  var dropdown2 = createSelect();
  for (var i = 0; i < data.users.length; i++) {
    var name = data.users[i].name;

    dropdown1.option(name);
    dropdown2.option(name);
    users[name] = data.users[i];

    delete data.users[i].name;
    delete data.users[i].timestamp;
  }

  var button = createButton('Submit');
  var resultP = createP();

  button.mousePressed(euclideanSimilarity);

  function euclideanSimilarity() {
    var name1 = dropdown1.value();
    var name2 = dropdown2.value();

    var ratings1 = users[name1];
    var ratings2 = users[name2];

    var titles = Object.keys(ratings1);

    var sumSquares = 0;
    for (var i = 0; i < titles.length; i++) {
      var title = titles[i];
      var rating1 = ratings1[title];
      var rating2 = ratings2[title];
      if (rating1 != null && rating2 != null) {
        var diff = rating1 - rating2;
        sumSquares += diff * diff;
      }
    }

    var d = Math.sqrt(sumSquares);
    var similarity = 1 / (1 + d);
    resultP.html(similarity);
  }
}