// /model/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    id: Number,
    name: String,
    email: String,
    arrive_work: String,
    leave_work: String,
    driver: Number,
    office_id: Number,
    lat: Number,
    lon: Number,
    start_addr: String,
    route: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);