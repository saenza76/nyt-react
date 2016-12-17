// Include the Mongoose Dependencies
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var nytSchema = new Schema({
  title: {
    type:String,
    unique:true,
    required:true
  },
  date: {
  	date:Date
  },
  url: {
  	type: String,
  	required:true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }
});

nytSchema.plugin(uniqueValidator);

// Create the Model
var nyt = mongoose.model('nyt', nytSchema);

// Export it for use elsewhere
module.exports = nyt;
