var fs = require('fs');
var express = require('express');
var router = express.Router();

var getSections = function () {
  return require('../data/data.json');
};

router.get('/', function (req, res, next) {
  res.status(200).send(JSON.stringify(getSections()));
});

router.get('/:section/:image/', function(req, res, next) {
  var sections = getSections();
  var section = req.params.section;
  var image = req.params.image;
  var item = req.query.item;
  var location = req.query.location;

  if(!sections) {
    res.status(200).send('Not found :(');
    return;
  }

  var output;
  var items = sections && sections[section];

  if(items && items[image]){
    items[image][location] = item;
  }

  output = sections;

  fs.writeFile(__dirname+'/../data/data.json', JSON.stringify(output) , function (err) {

    if(err){
      res.status(400).send({message: 'unable to write to the file', desc: JSON.stringify(err)});
    } else {
      res.status(200).send(JSON.stringify(output));
    }

  });
});


module.exports = router;
