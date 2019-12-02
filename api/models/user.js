// /model/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    name: String,
    email: String,
    arrive_work: String,
    leave_work: String,
    driver: Number,
    office_id: Number,
    successful: Boolean
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);