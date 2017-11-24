var mongoose = require('mongoose');
var User = mmongoose.model('userSchema');
var bcrypt = require('bcrypt');

var errors = {
  msg1: 'Username taken!',
  msg2: 'Usernames must be at least 5 characters long.',
  msg3: 'Passwords must be at least 8 characters long.',
  msg4: 'Usernames and passwords may not contain spaces.',
  msg5: 'That password and username did not match. Please try again.',
  msg6: 'That username does not exist. Sign up below.'
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

const checkUser = (req, res) => {
  isLoggedIn(req) ? createSession(req, res, req.session.user) : res.sendStatus(404);
};

exports.loggedUser = (req, res) => {
  checkUser(req, res);
};

exports.logout = (req, res) => {
  req.session.destroy();
  return res.send(null);
};

exports.authUser = (req, res) => {
  User.find({username : req.body.username}, (err, match) => {
    if (err) {
      res.status(403).send(err);
    } else {
      if (match.length === 1) {
        var hashed = match[0].password;
        var input = req.body.password;

        bcrypt.compare(input, hashed, (err, isMatching) => {
          if (isMatching) {
            var user = match[0];
            createSession(req, res, user);
          } else {
            res.status(403).send(errors.msg5)
          }
        });
      } else {
        res.status(400).send(errors.msg6);
      }
    }
  });
};