//requires the event model
const Event = require("../models/event");
const httpStatus = require("http-status-codes");

//gets the paramter using a function to reduce clutter
const getEventParams = (body) => {
  return {
    title: body.title,
    description: body.description,
    location: body.location,
    startDate: body.startDate,
    endDate: body.endDate,
    isOnline: body.isOnline,
    registrationLink: body.registrationLink,
    organizer: body.organizer,
  };
};

//exports everything in one statement with all of the functions
module.exports = {
  //index for fetching events
  index: (req, res, next) => {
    Event.find()
      .then((events) => {
        res.locals.events = events;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching events: ${error.message}`);
        next(error);
      });
  },
  //renders all of the events
  indexView: (req, res) => {
    if (req.query.format === "json") {
      res.json(res.locals.events);
    } else {
      res.render("events/index");
    }
  },
  //directs to the new events form
  new: (req, res) => {
    res.render("events/new");
  },
  //action to create a form and using flash
  create: (req, res, next) => {
    if (!res.locals.loggedIn) {
      req.flash("error", "Please sign in to create an event");
      res.locals.redirect = "/users/login";
      return next();
    }
    let eventParams = getEventParams(req.body);
    Event.create(eventParams)
      .then((event) => {
        req.flash("success", `${event.title} event created successfully!`);
        res.locals.redirect = "/events";
        res.locals.event = event;
        next();
      })
      .catch((error) => {
        console.log(`Error saving event: ${error.message}`);
        req.flash("error", `Failed to create event because: ${error.message}.`);
        res.locals.redirect = "/events/new";
        next();
      });
  },
  //redirecting the view
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  //getting a specific event id
  show: (req, res, next) => {
    let eventId = req.params.id;
    Event.findById(eventId)
      .then((event) => {
        res.locals.event = event;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching event by ID: ${error.message}`);
        next(error);
      });
  },
  //renders the view for the specific event
  showView: (req, res) => {
    res.render("events/show");
  },
  //editing a specifc event
  edit: (req, res, next) => {
    if (!res.locals.loggedIn) {
      req.flash("error", "Please sign in to edit an event");
      res.redirect("/users/login");
    } else {
      let eventId = req.params.id;
      Event.findById(eventId)
        .then((event) => {
          if (
            event.organizer != res.locals.currentUser.id &&
            !res.locals.currentUser.isAdmin
          ) {
            req.flash("error", "You do not have permission to edit this event");
            res.redirect("/users/login");
          } else {
            res.render("events/edit", {
              event: event,
            });
          }
        })
        .catch((error) => {
          console.log(`Error fetching event by ID: ${error.message}`);
          next(error);
        });
    }
  },
  //updatin the function by getting the parameters and setting them to something else
  update: (req, res, next) => {
    let eventId = req.params.id,
      eventParams = getEventParams(req.body);
    Event.findByIdAndUpdate(eventId, {
      $set: eventParams,
    })
      .then((event) => {
        req.flash("success", "Successfully updated this event");
        res.locals.redirect = `/events/${eventId}`;
        res.locals.event = event;
        next();
      })
      .catch((error) => {
        console.log(`Error updating event by ID: ${error.message}`);
        next(error);
      });
  },
  //deleting an event by finding it and removing it
  delete: (req, res, next) => {
    if (!res.locals.loggedIn) {
      req.flash("error", "Please sign in to delete an event");
      res.locals.redirect = "/users/login";
      next();
    } else {
      let eventId = req.params.id;
      Event.findById(eventId).then((event) => {
        if (!res.locals.currentUser.isAdmin) {
          req.flash("error", "You do not have permission to delete this event");
          res.locals.redirect = "/users/login";
          next();
        } else {
          Event.findByIdAndRemove(eventId)
            .then(() => {
              req.flash("success", "Successfully deleted this event");
              res.locals.redirect = "/events";
              next();
            })
            .catch((error) => {
              console.log(`Error deleting event by ID: ${error.message}`);
              next();
            });
        }
      });
    }
  },
  //attend an event which has an id and user has an id and redirects to login if they are not signed in
  attend: (req, res, next) => {
    if (!res.locals.loggedIn) {
      req.flash("error", "Please sign in to attend this event");
      res.locals.redirect = "/users/login";
      return next();
    }
    let eventId = req.params.id;
    let user = res.locals.currentUser;
    Event.updateOne({ _id: eventId }, { $push: { attendees: user } })
      .then((result) => {
        req.flash(
          "success",
          "You successfully added yourself to the attendees list"
        );
        res.locals.redirect = "/events";
        console.log(result);
        next();
      })
      .catch((error) => {
        console.log(`Error attending event: ${error.message}`);
        next(error);
      });
  },
  validate: (req, res, next) => {
    // Validate Title: Uppercase first letter
    req.check("title", "Title cannot be empty").notEmpty();

    // Validate Description: Required
    req.check("description", "Description cannot be empty").notEmpty();

    // Validate Location: Required
    req.check("location", "Location cannot be empty").notEmpty();

    // Validate Registration Link: Valid URL
    req.check("registrationLink", "Registration link is invalid").isURL();

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/events/new";
        next();
      } else {
        next();
      }
    });
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals,
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error.",
      };
    }
    res.json(errorObject);
  },
  filterUserEvents: (req, res, next) => {
    // Get the current user from res.locals
    let currentUser = res.locals.currentUser;
    // Check if there is a current user
    if (currentUser) {
      // Map through the events in res.locals
      let mappedEvents = res.locals.events.map((event) => {
        // Check if the current user has joined the course
        let userAttending = event.attendees.includes(currentUser.id);
        // Add a 'joined' property to the course object indicating whether the user has joined
        return Object.assign(event.toObject(), { attending: userAttending });
      });
      // Update res.locals.courses with the mapped courses
      res.locals.events = mappedEvents;
      // Continue to the next middleware
      next();
    } else {
      // If there is no current user, continue to the next middleware
      next();
    }
  },
};
