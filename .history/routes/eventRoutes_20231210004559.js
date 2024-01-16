const router = require("express").Router();
const eventsController = require("../controllers/eventsController");

//adding routes for events

//adding routes for event view, new user form and action for creating a new event
router.get("/events", eventsController.index, eventsController.indexView);
router.get("/events/new", eventsController.new);
router.post(
  "/events/create",
  eventsController.validate,
  eventsController.create,
  eventsController.redirectView
);

//routes for getting a specific event and being able to edit, and update it
router.get("/events/:id", eventsController.show, eventsController.showView);
router.get("/events/:id/edit", eventsController.edit);
router.put(
  "/events/:id/update",
  eventsController.validate,
  eventsController.update,
  eventsController.redirectView
);
//route for deletion
router.delete(
  "/events/:id/delete",
  eventsController.delete,
  eventsController.redirectView
);
//routes for when a user wants to attend an event either signed in or not signed in
router.get(
  "/events/:id/attend",
  eventsController.attend,
  eventsController.redirectView
);
router.get(
  "/events/:eventId/attend",
  eventsController.attend,
  eventsController.redirectView
);
