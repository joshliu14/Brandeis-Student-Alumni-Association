//Requiring mongoose, controllers, layouts, express, methodOverride, connectFlash,
//expressSession, cookieParser, expressValidator, passport, and user.
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const express = require("express");
const methodOverride = require("method-override");
const connectFlash = require("connect-flash");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const passport = require("passport");
const User = require("./models/user");
const router = require("./routes/index");

//create the app
const app = express();

//connecting to brandeis_saa database. Should create one if it does not exist and connects to it
mongoose.connect("mongodb://localhost:27017/brandeis_saa");
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to the database!");
});

//allowing ejs, layouts, static files etc. to be used such that everything can be rendered
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(layouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use methodOverride connect flash and express session
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(connectFlash());
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false,
  })
);

//use cookie parser, expressValidator, passport, and set up flash messages
app.use(cookieParser("secret_passcode"));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

//make sure to use the router
app.use("/", router);

//have the ap listen to a port number in this case is 3000 and display it in the console
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
