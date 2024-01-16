const router = require("express").Router();
const jobsController = require("../controllers/jobsController");

//adding routes for jobs

//adding routes for job view, new job form, and action to create a job
router.get("/jobs", jobsController.index, jobsController.indexView);
router.get("/jobs/new", jobsController.new);
router.post(
  "/jobs/create",
  jobsController.validate,
  jobsController.create,
  jobsController.redirectView
);

//routes for getting a specific job and being able to see it, and edit it
router.get("/jobs/:id", jobsController.show, jobsController.showView);
router.get("/jobs/:id/edit", jobsController.edit);
router.put(
  "/jobs/:id/update",
  jobsController.validate,
  jobsController.update,
  jobsController.redirectView
);

//routes for deleting a job
router.delete(
  "/jobs/:id/delete",
  jobsController.delete,
  jobsController.redirectView
);
