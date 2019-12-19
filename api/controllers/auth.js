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
            const url = "http://localhost:"  + process.env.PORT + "/login?email=" + req.user.email + "&name=" + req.user.fullname;
            res.redirect(url)
        
        })
    });

router.get('/logout', function (req, res) {
    req.logout();
    req.session.save(() => {
        const url = "http://localhost:"  + process.env.PORT;
        res.redirect(url);
      })
});

module.exports = router
