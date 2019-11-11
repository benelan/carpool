// /model/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    id: Number,
    message: String,
    name: String,
    email: { type: String, trim: true },
    driver: Boolean,
    start_loc: [Number],
    start_address: String,
    office_id: Number,
    arrive_work: String,
    leave_work: String,
    route: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);