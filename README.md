# Foosball Leaderboard

A carpool matcher app for Esri employees

## Prerequisites

To run the web app you must have [Node](https://nodejs.org/en/) installed. With Node installed, navigate to the root folder of the app and type:

```
npm install
node app.js
```
Open a modern browser and go to http://localhost:3000/


## TODO
To do list (Ask to be a collaborator and help me out!)
* Set up backend - MongoDB/Mongoose
* Create start point feature layer with user id
* Create user model
* Create user settings controller
* Create user settings view
* Create matched user table view
* Deal with authentication - [Passport](http://www.passportjs.org/docs/)
* Will Passport's OAuth work with Esri OAuth?
* Stop procrastinating

## Done List
completed items from TODO
* structure app - MVC


## Built With
* [Bootstrap](https://getbootstrap.com/) - Frontend
* [EJS](https://ejs.co/) - Embeded JavaScript
* [Node](https://nodejs.org/en/) - Backend
* [Express](https://expressjs.com/) - Web Framework

### Other Node Packages
* [body-parser](https://www.npmjs.com/package/body-parser) - Reading Forms
* [express-validator](https://express-validator.github.io/docs/) - Data Validation
* [helmet](https://helmetjs.github.io/) - Express Security
* [compression](https://www.npmjs.com/package/compression) - Route Compression
