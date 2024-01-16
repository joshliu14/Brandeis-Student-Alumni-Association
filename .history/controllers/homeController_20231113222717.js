//using ejs to render each page corresponding to a certain address
module.exports = {
  respondIndex: (req, res) => {
    res.render("index");
  },
  respondAbout: (req, res) => {
    res.render("about");
  },
  respondContact: (req, res) => {
    res.render("contact");
  },
  respondEvents: (req, res) => {
    res.render("events");
  },
  respondJobs: (req, res) => {
    res.render("jobs");
  },
};
