var mongoose = require('mongoose');
var Schema = mongoose.Schema

var sketchSchema = new Schema({
  picture: [
    // [
    //   {x: Number, y: Number}, 
    //   {x: Number, y: Number}
    // ]
  ]
});

var Sketches = mongoose.model('Sketch', sketchSchema);

module.exports = Sketches;
// var point = new Schema({
//   x: Number
// });

// var chat = new Schema({

// });