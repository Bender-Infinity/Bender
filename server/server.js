const express = require('express');
const routes = require('./routes.js');
const app = express();
const port = 3000;

app.use(function(req, res, next) {
  console.log('Request of type: ' + req.method + ', to: ' + req.url);
  next();
});

app.use(routes);

app.listen(port, () => {
  console.log('Working on Bender∞ on port ' + port);
});