const express = require('express')
  , router = express.Router()
  , User = require('../models/user');

// this is our get method
// this method fetches all available data in our database
router.get('/api/getAllUsers', ensureAuthenticated, (req, res) => {
  //User.findOneAndRemove({email:'belan@esri.com'}, (err, data) => {})
  
  User.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/api/queryUsers', ensureAuthenticated, (req, res) => {
  User.find({
    email: {$ne: req.query.email}, // don't show the user
    office_id: req.query.office, // only show colleagues in the same office
    $or: [ {driver: {$ne: req.query.driver}}, {driver: 3} ] // don't match a passanger with a passanger
  }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our get get one method
// this method fetches the user data by email
router.get('/api/getOneUser', ensureAuthenticated, (req, res) => {
  const em = req.query.email;

  User.findOne({email: em}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/api/updateUser', ensureAuthenticated, (req, res) => {
  const { em, update } = req.body;
  const query = {email: em};
  User.findOneAndUpdate(query, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// this is our delete method
// this method removes existing data in our database
// router.delete('/api/deleteUser', (req, res) => {
//   const { id } = req.body;
//   User.findByIdAndRemove(id, (err) => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// this is our create methid
// this method adds new data in our database
router.post('/api/addUser', ensureAuthenticated, (req, res) => {
  let data = new User();

  const { name, email, arrive_work, leave_work, driver, office_id, successful} = req.body;

  if (!name || !email || !arrive_work || !leave_work || !driver || !office_id || !successful) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  data.name = name;
  data.email = email;
  data.arrive_work = arrive_work;
  data.leave_work = leave_work;
  data.driver = driver;
  data.office_id = office_id;
  data.successful = successful;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

function ensureAuthenticated(req, res, next) {
  //console.log(req.sessionStore.sessions)
  if (!!req.sessionStore.sessions) {
    return next();
  }
}

module.exports = router
