# Carpool

A carpool matcher app for Esri employees. This branch creates a route from the user's home to their office. The user can then spatially filter the results table by creating a buffer around their route and finding colleagues that intersect the buffer. The 'master' branch does not filter spatially, but uses a custom backend api.

## Prerequisites

To run the web app you must have [Node](https://nodejs.org/en/) installed. With Node installed, navigate to the root folder of the app and type:

```
npm install
npm start
```

## Built With
This branch uses ArcGIS Online as the backend. The master branch uses the MERN Stack.
* [ArcGIS](https://developers.arcgis.com/javascript/) - Spatial Analysis
* [React](https://reactjs.org/) -Frontend Framework
* [Reactstrap](https://reactstrap.github.io/) - Bootstrap for React
