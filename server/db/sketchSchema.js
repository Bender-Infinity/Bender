var mongoose = require('mongoose');

var sketchSchema = new mongoose.Schema({
  user: String,
  picture: Array
});

var Sketches = mongoose.model('Sketch', sketchSchema);

module.exports = Sketches;