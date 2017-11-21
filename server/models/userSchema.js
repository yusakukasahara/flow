var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  photo: {type: String, default: ''},
  flow: {type: String, required: true}
});

mongoose.model('userSchema', userSchema);