var express = require('express');
var router = express.Router();
var postService = require('../service/postService');

/* GET home page. */
router.get('/', function(req, res) {
	postService.queryAllPost(function(e, posts){
		res.render('index',{"posts":posts});
	})
  // res.render('index', { title: 'Express' });
});

module.exports = router;
