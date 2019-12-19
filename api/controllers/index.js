const express = require('express')
    , router = express.Router()

router.use(require('./user'))
router.use(require('./auth'))

module.exports = router
