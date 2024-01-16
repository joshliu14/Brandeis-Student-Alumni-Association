const express = require("express");
const router = express.Router();
const jobsController = require("../controllers/jobsController");

//adding routes for jobs

//adding routes for job view, new job form, and action to create a job
router.get("/", jobsController.index, jobsController.indexView);
router.get("/new", jobsController.new);
router.post(
  "/create",
  jobsController.validate,
  jobsController.create,
  jobsController.redirectView
);

//routes for getting a specific job and being able to see it, and edit it
router.get("/:id", jobsController.show, jobsController.showView);
router.get("/:id/edit", jobsController.edit);
router.put(
  "/:id/update",
  jobsController.validate,
  jobsController.update,
  jobsController.redirectView
);

//routes for deleting a job
router.delete(
  "/:id/delete",
  jobsController.delete,
  jobsController.redirectView
);

module.exports = router;
