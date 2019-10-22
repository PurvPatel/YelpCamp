var express         = require("express"),
	app             = express(),
	bodyParser      = require("body-parser"),
	mongoose        = require("mongoose"),
	passport        = require("passport"),
	LocalStrategy   = require("passport-local"),
	methodOverride  = require("method-override");
	Campground      = require("./models/campground"),
	Comment         = require("./models/comment"),
	User            = require("./models/user");
	seedDB          = require("./seeds");

// Requiring Routes
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");  

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// seed the database
 seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//nav bar login/logout logic
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// Using Routes
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, process.env.IP, function(){
	console.log("The YelpCamp Server has started");
})