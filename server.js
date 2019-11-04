require('dotenv').config();
const express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , helmet = require('helmet')
  , compression = require('compression')
  , cors = require('cors')
  , mongoose = require('mongoose')
  , port = process.env.PORT || 4200
//   , session = require('express-session')
//   , { ExpressOIDC } = require('@okta/oidc-middleware')

// const oidc = new ExpressOIDC({
//   issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
//   client_id: process.env.OKTA_CLIENT_ID,
//   client_secret: process.env.OKTA_CLIENT_SECRET,
//   redirect_uri: process.env.REDIRECT_URL,
//   scope: 'openid profile',
//   appBaseUrl: `https://localhost:${port}`
//   // routes: {
//   //     callback: {
//   //         path: '/authorization-code/callback',
//   //         defaultRedirect: '/settings'
//   //     }
//   // }
// });

// app.use(session({
//   secret: process.env.RANDOM_SECRET_WORD,
//   resave: true,
//   saveUninitialized: false
// }));

// app.use(oidc.router);


// initialize database
const dbRoute = process.env.DB_ROUTE;
mongoose.connect(dbRoute, { useNewUrlParser: true });
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(helmet())  // security
app.use(compression()); //Compress all routes
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(require('./controllers'))

app.listen(port, () => console.log(`Listening on port ${port}`))
