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