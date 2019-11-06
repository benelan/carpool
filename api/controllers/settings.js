const express = require('express')
  , router = express.Router()
  //, Settings = require('../models/settings')

router.get('/settings', (req, res) => {
  res.render('settings')
})

module.exports = router
