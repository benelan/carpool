# Carpool

A carpool matcher app for Esri employees

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
- [ ] Filter results table based on distance, time, and driver/passenger
- [ ] Create React home/info page
- [ ] Finish setting up Okta auth, or use jwt
- [ ] Create option to remove yourself from list
- [ ] Stop procrastinating

## Built With MERN Stack
* [Bootstrap](https://getbootstrap.com/) - Frontend
* [React](https://reactjs.org/) -Frontend Framework
* [Node](https://nodejs.org/en/) - Backend
* [Express](https://expressjs.com/) - Backend Framework
* [MongoDB](https://www.mongodb.com/) - Database
* [Mongoose](https://mongoosejs.com/) - ODM

### Other Node Packages
* [body-parser](https://www.npmjs.com/package/body-parser) - Reading Forms
* [helmet](https://helmetjs.github.io/) - Express Security
* [compression](https://www.npmjs.com/package/compression) - Route Compression