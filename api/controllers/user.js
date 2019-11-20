const express = require('express')
  , router = express.Router()
  , User = require('../models/user');

// this is our get method
// this method fetches all available data in our database
router.get('/api/getAllUsers', (req, res) => {
  //User.findOneAndRemove({email:'belan@esri.com'}, (err, data) => {})
  
  User.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our get get one method
// this method fetches the user data by email
router.get('/api/getOneUser', (req, res) => {
  const em = req.query.email;

  User.findOne({email: em}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/api/updateUser', (req, res) => {
  const { id, update } = req.body;
  User.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/api/deleteUser', (req, res) => {
  const { id } = req.body;
  User.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/api/addUser', (req, res) => {
  let data = new User();

  const { id, name, email, arrive_work, leave_work, driver, office_id, lat, lon, start_addr, route} = req.body;

  if ((!id && id !== 0) || !name || !email || !arrive_work || !leave_work || !driver || !office_id || !lat || !lon || !start_addr || !route) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.id = id;
  data.name = name;
  data.email = email;
  data.arrive_work = arrive_work;
  data.leave_work = leave_work;
  data.driver = driver;
  data.office_id = office_id;
  data.lat = lat;
  data.lon = lon;
  data.start_addr = start_addr;
  data.route = route;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


module.exports = router
