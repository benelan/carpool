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
    commute: {
      driver: Boolean,
      start_loc: [Number],
      office_id: Number,
      arrive_work: Number,
      leave_work: Number,
      route: String,
      buffer_distance: Number
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);