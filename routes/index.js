var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var config = require('../config');
  res.render('index', config);
});

module.exports = router;
