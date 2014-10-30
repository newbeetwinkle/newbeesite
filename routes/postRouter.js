var express = require('express');
var router = express.Router();
var postService = require('../service/postService');

/* GET one post info. */
router.get('/detail/:postTimeId', function(req, res) {
  postService.queryOnePost(req.params.postTimeId,function(e, date){
  	res.send("register " + req.params.postTimeId + " sueccess!");
  });
});



module.exports = router;
