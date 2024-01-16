const router = require("express").Router();
const eventsController = require("../controllers/eventsController");
const usersController = require("../controllers/usersController");

router.use(usersController.verifyToken);

router.get(
  "/events",
  eventsController.index,
  eventsController.filterUserCourses,
  eventsController.respondJSON
);
router.get(
  "/events/:id/join",
  eventsContoller.join,
  eventsController.respondJSON
);
router.use(coursesController.errorJSON);

module.exports = router;
