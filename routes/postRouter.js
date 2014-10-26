var express = require('express');
var router = express.Router();
var postService = require('../service/postService');

/* GET one post info. */
router.get('/detail/:postId', function(req, res) {
  postService.queryOnePost(req.params.postId,function(){
  	res.send("register " + req.params.postId + " sueccess!");
  });
});



module.exports = router;
