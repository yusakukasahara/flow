var mongoose = require('mongoose');
var User = mmongoose.model('userSchema');
var bcrypt = require('bcrypt');

var errors = {
  msg1: 'Username taken!',
  msg2: 'Usernames must be at least 5 characters long.',
  msg3: 'Passwords must be at least 8 characters long.',
  msg4: 'Usernames and passwords may not contain spaces.'
}

const createSession = (req, res, newUser) => 
  req.session.regenerate(() => {
    req.session.user = newUser;
    res.send(newUser);
});

exports.createNewUser = (req, res) => {
  User.find({}, (err, allUsers) => {

    let allUsersArray = allUsers.map(obj => obj.username);
    
    if (allUsersArray.includes(req.body.username)) {
      res.status(400).send(errors.msg1);
    } else if (req.body.username.length < 5) {
      res.status(400).send(errors.msg2)
    } else if (req.body.password.length < 8) {
      res.status(400).send(errors.msg3)
    } else if (req.body.username.split(' ').length > 1 || 
               req.body.password.split(' ').length > 1) {
      res.status(400).send(errors.msg4)

    } else {
      bcrypt.hash(req.body.password, 10)
        .then(hashedPass => {
          req.body.password = hashedPass;
          var newUser = new User(req.body);
          newUser.save((err, newUser) => {
            if (err) {return res.status(401).send(err)}
            createSession(req, res, newUser);
            }
          })
        })
    }
  })
};

exports.loggedUser = (req, res) => {

};

exports.authUser = (req, res) => {

};