//port number 8080 and requiring controllers, layouts, express, and creating the app
const port = 8080;
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");
const express = require("express");
const app = express();

//allowing ejs, layouts, static files etc. to be used such that everything can be rendered
app.use(layouts);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//adding routes for css, images, and html pages using router, content type, and utils
app.get("/", homeController.respondIndex);
app.get("/index", homeController.respondIndex);
app.get("/about", homeController.respondAbout);
app.get("/jobs", homeController.respondJobs);
app.get("/events", homeController.respondEvents);
app.get("/contact", homeController.respondContact);

//using the errorController in case an error is encountered
app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

//have the ap listen to a port number in this case is 8080 and display it in the console
app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
