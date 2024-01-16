//using ejs to render each page corresponding to a certain address
//old home controller for basic ejs files
//added the route for chats
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
  chat: (req, res) => {
    res.render("chat");
  },
};
