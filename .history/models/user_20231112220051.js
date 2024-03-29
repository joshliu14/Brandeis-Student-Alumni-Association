const mongoose = require("mongoose");
const Subscriber = require("./subscriber");
//const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
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
});

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email,
    })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
