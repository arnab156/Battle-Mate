var friendsData = require("../data/sports.js")
module.exports = function(app){
    app.get("/api/friends", function(req, res){
        // return res.json(friendsData);
        console.log("hello friends");
    });

    app.post("/api/friends",function(req, res){
        // console.log("Here is the request body"+req.body); 
        // console.log(JSON.stringify(req.body));
        var tempFriend = req.body
        
        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: req.body.scores.map(score => parseInt(score))
        };
        console.log("Here is my new friend"+newFriend);
        console.log(JSON.stringify(newFriend));
        
        var newfriendScore = newFriend.scores;
        console.log(newfriendScore);
        

        var totalMatches = []; // stores the diff of each score with each player

        for(var i=0;i<friendsData.length;i++){
            var matchScore = [];

            for(var j=0; j<friendsData[i].scores.length;j++){
                matchScore.push(Math.abs(newFriend.scores[j]-friendsData[i].scores[j])); //deducting each new score with each of the existing players score
            }
            totalMatches.push(matchScore);
        }

        // console.log(totalMatches);


        var grandTotalMatches = []; //list of differences with each players
        
        for (var z=0;z<totalMatches.length;z++){

            var numbers = totalMatches[z]
            // console.log(numbers);
            function getSum(total, num) {
                return total + num;
            }

            var diff = numbers.reduce(getSum);
            // console.log(diff);
            grandTotalMatches.push(diff);
        }

        // console.log(grandTotalMatches); // the player with lowest score wins

        const min = Math.min(...grandTotalMatches)
        console.log(min)

        for (var a = 0; a<grandTotalMatches.length; a++){

            if( min === grandTotalMatches[a] ){
                console.log(friendsData[a].name);
                console.log(friendsData[a].photo);
    
                // return $("#insertMatch").append(friendsData[a].name+friendsData[a].photo);
            }
            return  res.send(friendsData[a].name+friendsData[a].photo);
        }


    });

}




