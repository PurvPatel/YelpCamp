var mongoose   = require("mongoose");
var Comment    = require("./models/comment");
var Campground = require("./models/campground");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
	//remove all campgrounds
	/*Campground.deleteMany({}, function(err){
		if(err){
			consloe.log(err);
		} else {
			console.log("All campgrounds removed");
*/
			//add a few campgrounds
/*			data.forEach(function(seed){
				Campground.create(seed, function(err, data){
					if(err){
						console.log(err);
					} else {
						console.log("Added one campground");

						//create new comment
						Comment.create(
							{
								text: "This place is great, but I wish there was internet",
								author: "Homer"
							}, function(err, comment){
								if(err){
									console.log(err);
								} else{
									data.comments.push(comment);
									data.save();
									console.log("Created new comment");
								}
							});
					}
				})
			});
		}
	});*/	
}

module.exports = seedDB;