//Requiring mongoose, controllers, layouts, express, and creating the app
const mongoose = require("mongoose");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const express = require("express");

const router = express.Router();

mongoose.connect("mongodb://localhost:27017/the_kitchen");
db.once("open", () => {
  console.log("Connected to the database!");
});

const app = express();

//allowing ejs, layouts, static files etc. to be used such that everything can be rendered
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(layouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
router.use(connectFlash());
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(cookiesParser("secret_passcode"));

router.use(expressValidator());
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

//adding routes for css, images, and html pages using router, content type, and utils
router.get("/", homeController.respondIndex);
router.get("/index", homeController.respondIndex);
router.get("/about", homeController.respondAbout);
router.get("/jobs", homeController.respondJobs);
router.get("/events", homeController.respondEvents);
router.get("/contact", homeController.respondContact);

//using the errorController in case an error is encountered
router.use(errorController.respondInternalError);
router.use(errorController.respondNoResourceFound);

//have the ap listen to a port number in this case is 8080 and display it in the console
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
