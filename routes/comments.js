var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");


// NEW  COMMENT
router.get("/new", isLoggedIn, function(req, res){
	// find campgorund by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
	
});


// CREATE COMMENT
router.post("/", isLoggedIn, function(req, res){
	// look up campground using id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// create a new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					
					// connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					// redirect to campground SHOW page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// EDIT COMMENT, edit comment page
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, comment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: comment});
		}
	});
			
	
});

// UPDATE COMMENT, save updated comment
router.put("/:comment_id/edit", checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTORY COMMENT
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
	// findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
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

function checkCommentOwnership(req, res, next){
	//is user logged in?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
				//does user own the comment?
				if(foundComment.author.id.equals(req.user._id)){
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

module.exports = router;