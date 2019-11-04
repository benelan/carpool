const express = require('express')
  , router = express.Router()
  , path = require('path');

router.use(require('./settings'))
router.use(require('./users'))

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../views/pages') });
})

module.exports = router
