//Requiring mongoose, controllers, layouts, express, and creating the app
const mongoose = require("mongoose");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const jobsController = require("./controllers/jobsController");
const eventsController = require("./controllers/eventsController");
const layouts = require("express-ejs-layouts");
const express = require("express");
const methodOverride = require("method-override");
const connectFlash = require("connect-flash");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const passport = require("passport");
const User = require("./models/user");

const router = express.Router();

mongoose.connect("mongodb://localhost:27017/brandeis_saa");
const db = mongoose.connection;
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
app.use("/", router);
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
router.use(cookieParser("secret_passcode"));
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
//router.get("/jobs", homeController.respondJobs);
//router.get("/events", homeController.respondEvents);
router.get("/contact", homeController.respondContact);

//adding routes for users
router.get("/users/login", usersController.login);
router.post(
  "/users/login",
  usersController.authenticate,
  usersController.redirectView
);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

//adding routes for events
router.get("/events", eventsController.index, eventsController.indexView);
router.get("/events/new", eventsController.new);
router.post(
  "/events/create",
  eventsController.create,
  eventsController.redirectView
);
router.get("/events/:id", eventsController.show, eventsController.showView);
router.get("/events/:id/edit", eventsController.edit);
router.put(
  "/events/:id/update",
  eventsController.update,
  eventsController.redirectView
);
router.delete(
  "/events/:id/delete",
  eventsController.delete,
  eventsController.redirectView
);

//adding routes for jobs
router.get("/jobs", jobsController.index, jobsController.indexView);
router.get("/jobs/new", jobsController.new);
router.post("/jobs/create", jobsController.create, jobsController.redirectView);
router.get("/jobs/:id", jobsController.show, jobsController.showView);
router.get("/jobs/:id/edit", jobsController.edit);
router.put(
  "/jobs/:id/update",
  jobsController.update,
  jobsController.redirectView
);
router.delete(
  "/jobs/:id/delete",
  jobsController.delete,
  jobsController.redirectView
);

//using the errorController in case an error is encountered
router.use(errorController.respondInternalError);
router.use(errorController.respondNoResourceFound);

//have the ap listen to a port number in this case is 8080 and display it in the console
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
