//require mongoose
const mongoose = require("mongoose");

//create a schema
const Schema = mongoose.Schema;
//create the event schema with parameters
const eventSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isOnline: { type: Boolean, default: false },
  registrationLink: { type: String, required: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

//export the model
module.exports = mongoose.model("Event", eventSchema);
