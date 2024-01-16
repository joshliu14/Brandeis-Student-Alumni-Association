//requires the event model
const Event = require("../models/event");

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
    res.render("events/index");
  },
  //directs to the new events form
  new: (req, res) => {
    res.render("events/new");
  },
  //action to create a form and using flash
  create: (req, res, next) => {
    if (req.body.organizer === undefined) {
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
  //showing a specific id
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
  showView: (req, res) => {
    res.render("events/show");
  },
  edit: (req, res, next) => {
    let eventId = req.params.id;
    Event.findById(eventId)
      .then((event) => {
        res.render("events/edit", {
          event: event,
        });
      })
      .catch((error) => {
        console.log(`Error fetching event by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let eventId = req.params.id,
      eventParams = getEventParams(req.body);
    Event.findByIdAndUpdate(eventId, {
      $set: eventParams,
    })
      .then((event) => {
        res.locals.redirect = `/events/${eventId}`;
        res.locals.event = event;
        next();
      })
      .catch((error) => {
        console.log(`Error updating event by ID: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let eventId = req.params.id;
    Event.findByIdAndRemove(eventId)
      .then(() => {
        res.locals.redirect = "/events";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting event by ID: ${error.message}`);
        next();
      });
  },
  attend: (req, res, next) => {
    let eventId = req.params.eventId;
    let userId = req.params.userId;
    if (userId === undefined) {
      req.flash("error", "Please sign in to attend events");
      res.locals.redirect = "/users/login";
      return next();
    }
    Event.updateOne({ _id: eventId }, { $push: { attendees: userId } })
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
};
