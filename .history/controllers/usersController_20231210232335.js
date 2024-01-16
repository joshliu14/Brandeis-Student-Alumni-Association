//require user and passport
const User = require("../models/user");
const passport = require("passport");
const token = process.env.TOKEN || "busaaT0k3n";

//get parameters outside to reduce clutter
const getUserParams = (body) => {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
    graduationYear: body.graduationYear,
    major: body.major,
    job: body.job,
    company: body.company,
    city: body.city,
    state: body.state,
    country: body.country,
    zipCode: body.zipCode,
    bio: body.bio,
    interests: body.interests,
  };
};

//export everything in one statement
module.exports = {
  //get users
  index: (req, res, next) => {
    User.find()
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  //display index which shows all users
  indexView: (req, res) => {
    res.render("users/index");
  },
  //renders new user form
  new: (req, res) => {
    res.render("users/new");
  },
  //creates a new user. anyone can do this.
  create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", `${user.name}'s account created successfully!`);
        res.locals.redirect = "/users";
        next();
      } else {
        req.flash(
          "error",
          `Failed to create user account because: ${error.message}.`
        );
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },
  //redirects view
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  //gets specific user id to show
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  //displays the view of a specific user id
  showView: (req, res) => {
    res.render("users/show");
  },
  //get the user id for editing and rendering the edit view form. You need to be the user that created the user or admin to edit
  edit: (req, res, next) => {
    if (!res.locals.loggedIn) {
      req.flash("error", "Please sign in to edit a user");
      res.redirect("/users/login");
    } else {
      let userId = req.params.id;
      User.findById(userId)
        .then((user) => {
          if (
            user != res.locals.currentUser.id &&
            !res.locals.currentUser.isAdmin
          ) {
            req.flash("error", "You do not have permission to edit this user");
            res.redirect("/users/login");
          } else {
            res.render("users/edit", {
              ser: user,
            });
          }
        })
        .catch((error) => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
    }
  },
  //update the user from the form data.
  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = getUserParams(req.body);
    User.findByIdAndUpdate(userId, {
      $set: userParams,
    })
      .then((user) => {
        req.flash("success", "Successfully updated User data");
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },
  //delete a user by id. Only admin can do this.
  delete: (req, res, next) => {
    if (!res.locals.loggedIn) {
      req.flash("error", "Please sign in to delete a User");
      res.locals.redirect = "/users/login";
      return next();
    } else if (!res.locals.currentUser.isAdmin) {
      req.flash("error", "You do not have permission to delete this event");
      res.locals.redirect = "/users/login";
      return next();
    }
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },
  //validate a user and make sure everything is correct
  validate: (req, res, next) => {
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true,
      })
      .trim();
    req.check("email", "Email is invalid").isEmail();
    req
      .check("zipCode", "Zip code is invalid")
      .notEmpty()
      .isInt()
      .isLength({
        min: 5,
        max: 5,
      })
      .equals(req.body.zipCode);
    req.check("password", "Password cannot be empty").notEmpty();
    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    });
  },
  //renders the login page
  login: (req, res) => {
    res.render("users/login");
  },
  //authentication for users logging in
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash:
      "Your account or password is incorrect. Please try again or contact your system administrator!",
    successRedirect: "/",
    successFlash: "Successfully logged in!",
  }),
  //logging out using logout
  logout: (req, res) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.redirect("/");
  },
  //api token verification to make sure that the users data only shows for that user.
  verifyToken: (req, res, next) => {
    let token = req.query.apiToken;

    if (token) {
      User.findOne({ apiToken: token })
        .then((user) => {
          if (user) next();
          else next(new Error("Invalid API token"));
        })
        .catch((error) => {
          next(new Error(error.message));
        });
    } else next(new Error("Invalid API token"));
  },
};
