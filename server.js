require('dotenv').config();
const express = require('express')
  , app = express()
  , session = require('express-session')
  , MongoStore = require('connect-mongo')(session)
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , helmet = require('helmet')
  , compression = require('compression')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , User = require('./api/models/user')
  , ArcGISStrategy = require('passport-arcgis').Strategy
  , port = 3001;

passport.serializeUser(function (user, done) {
  User.find({email: user.email}, function(err, user) {
    done(err, user);
  });
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Use the ArcGISStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and ArcGIS
//   profile), and invoke a callback with a user object.
passport.use(new ArcGISStrategy({
  clientID: process.env.ARCGIS_CLIENT_ID,
  clientSecret: process.env.ARCGIS_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/arcgis/callback"
},
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
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

app.use(helmet())  // security
app.use(compression()); // compress all routes
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  //cookie : { httpOnly: true, maxAge: 2419200000 },
  store: new MongoStore({ mongooseConnection: db })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.user = req.user || null
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(require('./api/controllers'))

app.listen(port, () => console.log(`Listening on port ${port}`))
