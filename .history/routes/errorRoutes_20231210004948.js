const router = require("express").Router();
const errorController = require("../controllers/errorController");

//using the errorController in case an error is encountered
router.use(errorController.respondInternalError);
router.use(errorController.respondNoResourceFound);
