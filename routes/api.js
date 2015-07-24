var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:section/:item', function(req, res, next) {
  var sections = require('../data/data.json').sections;
  var section = req.params.section;
  var item = req.params.item;
  var output;

  if(sections[section]){
    var items = (sections[section]['items'] = sections[section]['items'] || {});
    items[item] = {};
  }

  output = sections;

  res.status(200).send(JSON.stringify(output));
});


module.exports = router;
