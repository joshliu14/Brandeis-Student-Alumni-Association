//require mongoose and passport
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//get schema
const Schema = mongoose.Schema;
//create user schema with correct parameters
const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  role: { type: String, enum: ["student", "alumni"], default: "student" },
  graduationYear: { type: Number, required: true },
  major: { type: String, required: true },
  job: { type: String },
  company: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipCode: { type: Number, min: 10000, max: 99999 },
  bio: { type: String },
  interests: [{ type: String }],
  isAdmin: { type: Boolean, default: false },
  apiToken: {
    type: String,
  },
});

//use passport local mongoose
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

//export user model
module.exports = mongoose.model("User", userSchema);
