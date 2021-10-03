# Carpool

A carpool matcher app for Esri employees. This branch creates a route from the user's home to their office. The user can then spatially filter the resulting table by creating a buffer around their route and finding colleagues that intersect the buffer. The 'master' branch does not filter spatially, but uses a custom backend api.

## Prerequisites
This branch uses the Esri [resource-proxy](https://github.com/Esri/resource-proxy). If you are not on Esri's intranet where my proxy is hosted, it will not work. You will need to set up your own proxy and feature layer.

> Note: The Esri resource proxy is now deprecated.

To run the web app you must have [Node](https://nodejs.org/en/) installed. With Node installed, navigate to the root folder of the app and type:

```
npm install
npm start
```

## Built With
This branch uses ArcGIS Online. The master branch uses the MERN Stack.
* [ArcGIS](https://developers.arcgis.com/javascript/) - Spatial Analysis
* [React](https://reactjs.org/) -Frontend Framework
* [Reactstrap](https://reactstrap.github.io/) - Bootstrap for React
* [TypeScript](https://www.typescriptlang.org/) - JavaScript Typing
* [MobX](https://mobx.js.org/) - State Management
