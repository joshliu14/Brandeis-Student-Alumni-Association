const job = require("../models/job");
const Job = require("../models/user");

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
  };
};

module.exports = {
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
  indexView: (req, res) => {
    res.render("jobs/index");
  },
  new: (req, res) => {
    res.render("jobs/new");
  },
  create: (req, res, next) => {
    if (req.skip) next();
    let newJob = new Job(getJobParams(req.body));
    Job.register(newJob, req.body.password, (error, job) => {
      if (job) {
        req.flash("success", `${job.title} position created successfully!`);
        res.locals.redirect = "/jobs";
        next();
      } else {
        req.flash(
          "error",
          `Failed to create job position because:${error.message}.`
        );
        res.locals.redirect = "/jobs/new";
        next();
      }
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
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
  showView: (req, res) => {
    res.render("jobs/show");
  },
  edit: (req, res, next) => {
    let jobId = req.params.id;
    Job.findById(jobId)
      .then((job) => {
        res.render("jobs/edit", {
          job: job,
        });
      })
      .catch((error) => {
        console.log(`Error fetching job by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let jobId = req.params.id,
      jobParams = getJobParams(req.body);
    Job.findByIdAndUpdate(jobId, {
      $set: jobParams,
    })
      .then((job) => {
        res.locals.redirect = `/users/${jobId}`;
        res.locals.job = job;
        next();
      })
      .catch((error) => {
        console.log(`Error updating job by ID: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let jobId = req.params.id;
    job
      .findByIdAndRemove(jobId)
      .then(() => {
        res.locals.redirect = "/jobs";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting job by ID: ${error.message}`);
        next();
      });
  },
};
