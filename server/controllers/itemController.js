var mongoose = require('mongoose');
var Item = mongoose.model('itemSchema');

exports.getAllItems = (req, res) => {
  Items.find({}, (err, data) => {
    if (err) {return res.status(404).send(err)};
    let result = data.reduce((output, datum) => {
      output.push({
        itemId: datum._id,
        name: datum.name,
        description: datum.description,
        x: datum.xcoordinate,
        y: datum.ycoordinate
      });
      return output;
    }, [])
    res.send(output);
  })
};

exports.addNewItem = (req, res) => {
  var newItem = new Item(req.body);
  newItem.save((err, item) => {
    if (err) {return res.status(401).send(err)};
    res.send(item);
  });
};

exports.updateItem = (req, res) => {
  Item.findOneAndUpdate(
    { _id: req.params.id }, req.body, {new:true}, 
    (err, item) => {
      if (err) {return res.status(404).send(err)};
      res.send(item);
  }));
};