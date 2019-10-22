var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX route, show all campgrounds
router.get("/", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds:campgrounds});
});

//NEW route, display a form to add a new campground
router.get("/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//CREATE route, add new campground
router.post("/", isLoggedIn, function(req, res){
	// get data from form and add to campground DB
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {
		name: name, 
		image: image, 
		description: description,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	};

	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			//default redirect is to a get request
			res.redirect("/campgrounds"); 
		}
	});
	
});

//SHOW route, display one campground, must come after NEW route to avoid logic error
router.get("/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			//render found campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT route, edit a campground
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE route, save edited campground 
router.put("/:id", checkCampgroundOwnership, function(req, res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			// redirect to show page of updated campground
			res.redirect("/campgrounds/" + req.params.id);
		}
	});

});

// DESTROY route, delete a campground
router.delete("/:id", checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

function checkCampgroundOwnership(req, res, next){
	//is user logged in?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				res.redirect("back");
			} else {
				//does user own the campground?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		//redirect to page they came from
		res.redirect("back");
	}
}

//export router
module.exports = router;