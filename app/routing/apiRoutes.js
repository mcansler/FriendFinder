var friends = require("../data/friends.js");

module.exports = function(app){

    app.get("/api/friends", function(req,res){
        res.json(friends);
    });

    app.post("/api/friends", function(req,res){

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        var totalDifference;

        for (var i = 0; i < friends.length; i++){

            //console.log(friends[i]);
            totalDifference = 0;

            for (var j = 0; j < friends[i].scores.length; j++){

                console.log(friends[i].name);
                console.log(friends[i].scores[j]);

                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                
                //console.log(totalDifference);

            }

            if (totalDifference <= bestMatch.friendDifference){

                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
                console.log(bestMatch.friendDifference);
            }
        }

        friends.push(userData);

        res.json(bestMatch);
    });
}