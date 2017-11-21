var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: {type: String, required: true, index: {unique: true}},
  description: { type: String, required: true },
  xcoordinate: { type: String, default: 0 },
  ycoordinate: { type: String, default: 0 }
});

mongoose.model('itemSchema', itemSchema);