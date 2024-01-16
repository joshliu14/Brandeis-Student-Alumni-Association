const router = require("express").Router();
const usersController = require("../controllers/usersController");

//adding routes for users

//adding routes for user login and logout
router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);
//adding routes for user view, new user form, and action for creating a user
router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.post(
  "/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
//adding routes for getting a specific user and for editing and updating that user
router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
//adding routes to delete a certain user
router.delete(
  "/:id/delete",
  usersController.delete,
  usersController.redirectView
);
