# Carpool
A carpool matcher app for Esri employees. Check out the 'spatial' branch for a more advanced solution. The 'spatial' branch creates a route from the user's home to their office. The user can then spatially filter the results table by creating a buffer around their route and finding colleagues that intersect the buffer. The 'spatial' branch uses ArcGIS Online as the backend api.

## Using the App
To get started, you will need to set up an application with [ArcGIS for Developers](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/accessing-arcgis-online-services/) in order to implement app login.

Next, if you don't have one, create an account at [mongoDB Atlas](https://docs.atlas.mongodb.com/getting-started/). Once you set up your account, you will need to create a file in the root directory of this application called '.env'. In the file, add:

```
DB_ROUTE=<CONNECTION STRING PROVIDED BY ATLAS>
SESSION_SECRET=<RANDOM STRING>
ARCGIS_CLIENT_ID=<CLIENT FROM AN ARCGIS APP>
ARCGIS_CLIENT_SECRET=<CLIENT_SECRET FROM AN ARCGIS APP>
```

To run the web app you must have [Node](https://nodejs.org/en/) installed. With Node installed, navigate to the root folder of the app and type:

```
npm install
npm start
```
The api and the react app will start concurrently.

## TODO
To do list
- [x] structure app - MVC
- [x] Set up database/odm - MongoDB/Mongoose
- [x] Create user model
- [x] Create user settings controller
- [x] Create React forms component for user settings
- [x] Create React data table component
- [x] Filter results table based on distance, time, and driver/passenger
- [ ] Create React home/info page
- [x] Set up jwt or [passport](http://www.passportjs.org/packages/passport-oauth2/)
- [ ] Impmlement a [time range slider](http://react-component.github.io/slider/examples/range.html) for filtering the results
- [ ] Create option to remove yourself from list
- [ ] Consider filter algorithm rework: what if people's filters do not match up?
- [ ] Stop procrastinating

## Built With MERN Stack
* [MongoDB](https://www.mongodb.com/) - Database
* [Mongoose](https://mongoosejs.com/) - ODM
* [Express](https://expressjs.com/) - Backend Framework
* [Express Session](https://github.com/expressjs/session) - Sessions for Express
* [React](https://reactjs.org/) - Frontend Framework
* [Reactstrap](https://reactstrap.github.io/) - Bootstrap for React
* [Node](https://nodejs.org/en/) - Backend

### Other Packages
* [axios](https://github.com/axios/axios) - REST Requests
* [body-parser](https://www.npmjs.com/package/body-parser) - Reading Forms
* [cookie-parser](https://github.com/expressjs/cookie-parser) - Reading Sessions
* [connect-mongo](https://github.com/jdesboeufs/connect-mongo) - MongoDB Session Store
* [compression](https://www.npmjs.com/package/compression) - Route Compression
* [helmet](https://helmetjs.github.io/) - Express Security Headers
* [moment](https://momentjs.com/) - Time/Date Util
* [moment-range](https://github.com/rotaready/moment-range) - Ranges for Moment
* [mobx](https://mobx.js.org/) - Data Store
* [mobx react](https://github.com/mobxjs/mobx-react) - MobX for React
* [passport](http://www.passportjs.org/) - Auth
* [passport-arcgis](http://www.passportjs.org/packages/passport-arcgis/) - Passport for ArcGIS

