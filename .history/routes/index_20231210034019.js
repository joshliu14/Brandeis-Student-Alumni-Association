const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes"),
  eventRoutes = require("./eventRoutes"),
  jobRoutes = require("./jobRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes"),
    const apiRoutes = require("./apiRoutes");
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/jobs", jobRoutes);
router.use("/", homeRoutes);


router.use("/", errorRoutes);

module.exports = router;
