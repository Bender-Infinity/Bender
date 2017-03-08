 var db = require('mongoose');
 db.connect('mongodb://localhost/bender');

 module.exports = db;