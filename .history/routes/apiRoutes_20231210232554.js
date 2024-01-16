//api requirements and routing
const router = require("express").Router();
const eventsController = require("../controllers/eventsController");
const usersController = require("../controllers/usersController");

//verifies the token
router.use(usersController.verifyToken);

//routing for getting the json format of data
router.get(
  "/events",
  eventsController.index,
  eventsController.filterUserEvents,
  eventsController.respondJSON
);
//routing for attending an event through the modal
router.get(
  "/events/:id/attend",
  eventsController.attend,
  eventsController.respondJSON
);
router.use(eventsController.errorJSON);

module.exports = router;
