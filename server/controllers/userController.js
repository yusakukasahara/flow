var mongoose = require('mongoose');
var User = mmongoose.model('userSchema');
var bcrypt = require('bcrypt');

exports.createNewUser = (req, res) => {
  User.find({}, (err, allUsers) => {
    let allUsersArray = allUsers.map(obj => obj.username);
    if (allUsersArray.includes(req.body.username) {
      res.status(400).send('Username taken!');
    } else if (req.body.username.length < 5) {
      res.status(400).send('Usernames must be at least 5 characters')
    }
  })
};

exports.loggedUser = (req, res) => {

};

exports.authUser = (req, res) => {

};