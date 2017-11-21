module.exports = (app) => {
  var user = require('../controllers/userController.js');
  var item = require('../controllers/itemController.js');

  //routes for users
  app.get('/user', user.createNewUser); //signup
  app.get('/user/auth', user.loggedUser); //sessions
  app.post('user/auth', user.authUser); //log-in

  //routes for list items
  app.get('/item/:itemname', item.getAllItems); //get all items
  app.post('/item/:itemname', item.addNewItem); //add a new item
  app.get('/item/:itemname/details', item.getSpecificItemDetails); //get details
  app.delete('/item/:itemname', item.deleteItem); //delete item
}