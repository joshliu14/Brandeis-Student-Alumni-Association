const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

//adding routes for the home page, about, contact, and chat
router.get("/", homeController.respondIndex);
router.get("/index", homeController.respondIndex);
router.get("/about", homeController.respondAbout);
router.get("/contact", homeController.respondContact);
router.get("/chat", homeController.chat);

module.exports = router;
