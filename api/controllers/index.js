const express = require('express')
    , router = express.Router()

router.use(require('./user'))

module.exports = router
