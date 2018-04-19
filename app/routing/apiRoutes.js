// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

console.log(friendsData);


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------



  app.get("/api/survey", function (req, res) {
    res.json();
  });

  app.post("/api/survey", function (req, res) {

    var result = [];
    for (var i = 0; i < friendsData.length; i++) {

      var diff = function (newFriend, listFriend) {
        var diffsArray = [];
        for (var i = 0; i < newFriend.score.length; i++) {
          diff = Math.abs(newFriend.score[i] - listFriend.score[i]);
          diffsArray.push(diff);
        };
        var sum = 0;
        for (var i = 0; i < diffsArray.length; i++) {
          sum = sum + diffsArray[i];
        };
        return sum;
      }

      console.log(req.body);
      var sum = diff(req.body, friendsData[i]);
      if (result.length == 0) {
        result.push(sum);
        result.push(friendsData[i]);
      } else if (result[0] > sum) {
        result[0] = sum;
        result[1] = friendsData[i];
      }
    }
    if (friendsData.length) {
      friendsData.push(req.body);
      res.json(result[1]);
    } else {
      res.json(false);
    }
  });
};