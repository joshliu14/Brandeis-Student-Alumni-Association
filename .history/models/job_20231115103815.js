//require mongoose
const mongoose = require("mongoose");

//get schema
const Schema = mongoose.Schema;
//create jo schema with parameters
const jobSchema = Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  salary: { type: Number, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  deadlineDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

//export the job model
module.exports = mongoose.model("Job", jobSchema);
