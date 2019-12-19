const express = require('express')
    , router = express.Router()
    , passport = require('passport')

router.get('/auth/arcgis',
    passport.authenticate('arcgis', {session: true}));

router.get('/auth/arcgis/callback',
    passport.authenticate('arcgis', { failureRedirect: '/auth/arcgis', session: true }),
    function (req, res) {
        // Successful authentication, redirect home.
        req.session.save(() => {    
            res.redirect("http://localhost:3000/login?email=" + req.user.email + "&name=" + req.user.fullname)
        
        })
    });

router.get('/logout', function (req, res) {
    req.logout();
    req.session.save(() => {
        res.redirect('http://localhost:3000');
      })
});

module.exports = router
