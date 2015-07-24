var fs = require('fs');
var express = require('express');
var router = express.Router();

var getSections = function () {
  return require('../data/data.json').sections;
};

router.get('/', function (req, res, next) {
  res.status(200).send(JSON.stringify(getSections()));
});

router.get('/:section/:item', function(req, res, next) {
  var sections = getSections();
  var section = req.params.section;
  var item = req.params.item;
  var output;

  if(sections[section]){
    var items = (sections[section]['items'] = sections[section]['items'] || {});
    items[item] = {};
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
