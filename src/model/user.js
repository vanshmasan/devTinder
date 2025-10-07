const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 15,
    },
    lastname: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("value is not validate");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    hobbies: {
      type: [String],
    },
    about: {
      type: String,
      maxlength: 150,
      default: "Hey there! I am using DevTinder.",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
