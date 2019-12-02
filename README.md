# Carpool

A carpool matcher app for Esri employees. Check out the 'spatial' branch for a more advanced solution. The 'spatial' branch creates a route from the user's home to their office. The user can then spatially filter the results table by creating a buffer around their route and finding colleagues that intersect the buffer. The 'spatial' branch uses ArcGIS Online as the backend api.

## Prerequisites

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
- [ ] Finish setting up Okta auth, or use jwt
- [ ] Create option to remove yourself from list
- [ ] Stop procrastinating

## Built With MERN Stack

* [MongoDB](https://www.mongodb.com/) - Database
* [Mongoose](https://mongoosejs.com/) - ODM
* [Express](https://expressjs.com/) - Backend Framework
* [React](https://reactjs.org/) - Frontend Framework
* [Reactstrap](https://reactstrap.github.io/) - Bootstrap for React
* [Node](https://nodejs.org/en/) - Backend
* [ArcGIS](https://developers.arcgis.com/javascript/) - Auth

### Other Node Packages
* [axios](https://github.com/axios/axios) - REST Requests
* [body-parser](https://www.npmjs.com/package/body-parser) - Reading Forms
* [compression](https://www.npmjs.com/package/compression) - Route Compression
* [esri-loader](https://github.com/Esri/esri-loader) - ArcGIS Module Loader
* [helmet](https://helmetjs.github.io/) - Express Security
* [moment](https://momentjs.com/) - Time/Date Util
* [moment-range](https://github.com/rotaready/moment-range) - Ranges for Moment
