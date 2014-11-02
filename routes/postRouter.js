var express = require('express');
var router = express.Router();
var postService = require('../service/postService');

/* GET one post info. */
router.get('/detail/:postId', function(req, res) {
  postService.queryOnePost(req.params.postId,function(err, data){
      if(err){
          res.send("query " + req.params.postId + "failed!");
      } else{
          res.render('detail',{"post":data});
          console.log(data);
      }
  });
});

module.exports = router;
