const router = require("express").Router();
const homeController = require("../controllers/homeController");
//adding routes for the home page, about, and contact
router.get("/", homeController.respondIndex);
router.get("/index", homeController.respondIndex);
router.get("/about", homeController.respondAbout);
router.get("/contact", homeController.respondContact);
