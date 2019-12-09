const express = require('express')
    , app = express()
    , router = express.Router()
    , passport = require('passport')

router.get('/auth/arcgis',
    passport.authenticate('arcgis'));

router.get('/auth/arcgis/callback',
    passport.authenticate('arcgis', { failureRedirect: '/auth/arcgis' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("http://localhost:3000?email=" + req.user.email + "&name=" + req.user.fullname)
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('http://localhost:3000');
});

router.use(require('./user'))

module.exports = router
