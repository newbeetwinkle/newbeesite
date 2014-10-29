var express = require('express');
var router = express.Router();
var postService = require('../service/postService');

/* GET one post info. */
router.get('/detail/:postId', function(req, res) {
  postService.queryOnePost(req.params.postId,function(err, data){
      if(err){
          res.send("query " + req.params.postId + "failed!");
      } else{
          res.send(JSON.stringify(data));
      }
  });
});

module.exports = router;
