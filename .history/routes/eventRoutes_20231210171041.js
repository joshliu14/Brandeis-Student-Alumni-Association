const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

//adding routes for events

//adding routes for event view, new user form and action for creating a new event
router.get("/", eventsController.indexView);
router.get("/new", eventsController.new);
router.post(
  "/create",
  eventsController.validate,
  eventsController.create,
  eventsController.redirectView
);

//routes for getting a specific event and being able to edit, and update it
router.get("/:id", eventsController.show, eventsController.showView);
router.get("/:id/edit", eventsController.edit);
router.put(
  "/:id/update",
  eventsController.validate,
  eventsController.update,
  eventsController.redirectView
);
//route for deletion
router.delete(
  "/:id/delete",
  eventsController.delete,
  eventsController.redirectView
);
//routes for when a user wants to attend an event either signed in or not signed in
router.get(
  "/:id/attend",
  eventsController.attend,
  eventsController.redirectView
);

module.exports = router;
