//require jobs
const Job = require("../models/job");

//get parameters outside of function
const getJobParams = (body) => {
  return {
    title: body.title,
    company: body.company,
    location: body.location,
    description: body.description,
    requirements: body.requirements,
    salary: body.salary,
    contactEmail: body.contactEmail,
    contactPhone: body.contactPhone,
    postDate: body.postDate,
    deadlineDate: body.deadlineDate,
    isActive: body.isActive,
    organizer: body.organizer,
  };
};

//export everything in one statement
module.exports = {
  //get index
  index: (req, res, next) => {
    Job.find()
      .then((jobs) => {
        res.locals.jobs = jobs;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching jobs: ${error.message}`);
        next(error);
      });
  },
  //get the view of all jobs
  indexView: (req, res) => {
    res.render("jobs/index");
  },
  //get new job form
  new: (req, res) => {
    if (!res.locals.loggedIn) {
      req.flash("error", "Please sign in to create a job");
      res.redirect("/users/login");
    } else {
      res.render("jobs/new");
    }
  },
  //create new job
  create: (req, res, next) => {
    let jobParams = getJobParams(req.body);
    Job.create(jobParams)
      .then((job) => {
        req.flash("success", `${job.title} job created successfully!`);
        res.locals.redirect = "/jobs";
        res.locals.job = job;
        next();
      })
      .catch((error) => {
        console.log(`Error saving job: ${error.message}`);
        req.flash("error", `Failed to create job because: ${error.message}.`);
        res.locals.redirect = "/jobs/new";
        next();
      });
  },
  //redirect view to another page
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  //get a specific job of a certain id
  show: (req, res, next) => {
    let jobId = req.params.id;
    Job.findById(jobId)
      .then((job) => {
        res.locals.job = job;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching job by ID: ${error.message}`);
        next(error);
      });
  },
  //show the view of a specific job id
  showView: (req, res) => {
    res.render("jobs/show");
  },
  //find id of certain job to edit
  edit: (req, res, next) => {
    if (!res.locals.loggedIn) {
      req.flash("error", "Please sign in to update this job");
      res.redirect("/users/login");
      next();
    } else {
      let jobId = req.params.id;
      Job.findById(jobId)
        .then((job) => {
          if (
            job.organizer != res.locals.currentUser.id &&
            !res.locals.currentUser.isAdmin
          ) {
            req.flash("error", "You do not have permission to edit this job");
            res.redirect("/users/login");
            next();
          } else {
            res.render("jobs/edit", {
              job: job,
            });
          }
        })
        .catch((error) => {
          console.log(`Error fetching job by ID: ${error.message}`);
          next(error);
        });
    }
  },
  //edit and update a job
  update: (req, res, next) => {
    let jobId = req.params.id,
      jobParams = getJobParams(req.body);
    Job.findByIdAndUpdate(jobId, {
      $set: jobParams,
    })
      .then((job) => {
        req.flash("success", "Successfully updated this job");
        res.locals.redirect = `/jobs/${jobId}`;
        res.locals.job = job;
        next();
      })
      .catch((error) => {
        console.log(`Error updating job by ID: ${error.message}`);
        next(error);
      });
  },
  //find id of job and delete it
  delete: (req, res, next) => {
    if (!res.locals.loggedIn) {
      req.flash("error", "Please sign in to delete this job");
      res.locals.redirect = "/users/login";
      next();
    } else {
      let jobId = req.params.id;
      Job.findById(jobId)
        .then((job) => {
          if (!res.locals.currentUser.isAdmin) {
            req.flash("error", "You do not have permission to delete this job");
            res.locals.redirect = "/users/login";
            next();
          } else {
            Job.findByIdAndRemove(jobId)
              .then(() => {
                req.flash("success", "Successfully deleted this job");
                res.locals.redirect = "/jobs";
                next();
              })
              .catch((error) => {
                console.log(`Error deleting job by ID: ${error.message}`);
                next();
              });
          }
        })
        .catch((error) => {
          console.log(`Error: ${error.message}`);
          next();
        });
    }
  },
  //validate a user and make sure everything is correct
  validate: (req, res, next) => {
    req
      .sanitizeBody("contactEmail")
      .normalizeEmail({
        all_lowercase: true,
      })
      .trim();
    req.check("contactEmail", "Email is invalid").isEmail();
    // Validate Title: Uppercase first letter
    req.check("title", "Title cannot be empty").notEmpty();

    // Validate Description: Required
    req.check("description", "Description cannot be empty").notEmpty();

    // Validate Location: Required
    req.check("location", "Location cannot be empty").notEmpty();

    // Validate Company: Required
    req.check("company", "Company title cannot be empty").notEmpty();

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/jobs/new";
        next();
      } else {
        next();
      }
    });
  },
};
