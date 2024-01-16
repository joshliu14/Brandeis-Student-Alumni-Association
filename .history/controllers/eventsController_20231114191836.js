const Event = require("../models/event");

const getEventParams = (body) => {
  return {
    title: body.title,
    description: body.description,
    location: body.location,
    startDate: body.startDate,
    endDate: body.endDate,
    isOnline: body.isOnline,
    registrationLink: body.reqistrationLink,
    organizer: body.organizer,
  };
};

module.exports = {
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
  indexView: (req, res) => {
    res.render("events/index");
  },
  new: (req, res) => {
    res.render("events/new");
  },
  create: (req, res, next) => {
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
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
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
};
