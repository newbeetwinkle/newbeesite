var express = require('express');
var router = express.Router();
var postService = require('../service/postService');

/* GET home page. */
router.get('/', function(req, res) {
	postService.queryAllPost(function(e, posts){
		posts.forEach(function(element, index, array){
			if(element.content && element.content.length > 100){
				element.content = element.content.substring(0, 100) + "...";
			}
		});
		res.render('index',{"posts":posts,"user":req.session.user});
	})
});


module.exports = router;
