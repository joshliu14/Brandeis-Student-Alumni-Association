//import mongoose and create new schema for message.js
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", messageSchema);
