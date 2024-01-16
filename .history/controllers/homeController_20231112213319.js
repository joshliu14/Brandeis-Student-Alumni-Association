//using ejs to render each page corresponding to a certain address
exports.respondIndex = (req,res) => {
    res.render("index");
};

exports.respondAbout = (req,res) => {
    res.render("about");
};

exports.respondContact = (req,res) => {
    res.render("contact");
};

exports.respondEvents = (req,res) => {
    res.render("events");
};

exports.respondJobs = (req,res) => {
    res.render("jobs");
};