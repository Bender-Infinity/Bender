var mongoose = require('mongoose');

var transcriptSchema = new mongoose.Schema({
  timeStamp: String,
  user: String,
  transcript: String
});

var Transcripts = mongoose.model('Transcript', transcriptSchema);

module.exports = Transcripts;