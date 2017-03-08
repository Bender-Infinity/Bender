var mongoose = require('mongoose');

var sketchSchema = mongoose.Schema({
  picture: [
    line: [
      {x: Number, y: Number}, 
      {x: Number, y: Number}
    ]
  ]
});

var Sketches = mongoose.model('Sketch', sketchSchema);

module.exports = Sketches;
// var point = new Schema({
//   x: Number
// });

// var chat = new Schema({

// });