const express = require('express')
  , router = express.Router()
  , path = require('path')


// router.use(require('./settings'))
 router.use(require('./user'))


module.exports = router
