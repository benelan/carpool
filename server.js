require('dotenv').config();
const express = require('express')
  , app = express()
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , helmet = require('helmet')
  , compression = require('compression')
  , cors = require('cors')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , ArcGISStrategy = require('passport-arcgis').Strategy
  , port = 3001

var ARCGIS_CLIENT_ID = "n5A1575tmQq5eFPd";
var ARCGIS_CLIENT_SECRET = "57e6d7d291fb4e3ba869c2ffd3fd3bb0";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Use the ArcGISStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and ArcGIS
//   profile), and invoke a callback with a user object.
passport.use(new ArcGISStrategy({
  clientID: ARCGIS_CLIENT_ID,
  clientSecret: ARCGIS_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/arcgis/callback"
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function() {
    
    // To keep the example simple, the user's ArcGIS profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the ArcGIS account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));


// initialize database
const dbRoute = process.env.DB_ROUTE;
mongoose.connect(dbRoute, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(helmet())  // security
app.use(compression()); // compress all routes
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'fdjkdasglfkdagy8r9eigujfs9',
  resave: false,
  saveUninitialized: false
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next(); 
  });
  //enable pre-flight
//app.options('*', cors());

app.use(require('./api/controllers'))

app.listen(port, () => console.log(`Listening on port ${port}`))
