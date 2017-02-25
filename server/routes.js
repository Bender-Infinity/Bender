const express = require('express');
const bodyParser = require('body-parser');
const routes = express();

//Parse incoming body
routes.use(bodyParser.urlencoded({extended: false}));
routes.use(bodyParser.json());

//Serve static files
routes.use(express.static(__dirname + '/../public'));

//ROUTES HERE
routes.get('/', function(req, res) { res.sendStatus(200); })

//wildcard redirect to root
routes.get('/*', function(req, res) {
  res.redirect('/');
});

module.exports = routes;