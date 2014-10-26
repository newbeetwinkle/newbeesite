var express = require('express');
var router = express.Router();

require('express-mongoose');
var models = require('../dao/MongoSchema');
var User = models.User;


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/users', function(req, res) {
//    var user = new User({"name" : "Admin", "age" : 1});
//    user.save();
    res.send(User.find());
});

module.exports = router;
