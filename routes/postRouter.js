var express = require('express');
var router = express.Router();
var postService = require('../service/postService');

/* GET one post info. */
router.get('/:postId', function(req, res) {
  postService.queryOnePost(req.params.postId,function(err, data){
      if(err){
          res.send("query " + req.params.postId + "failed!");
      } else{
          res.render('detail',{"post":data});
          console.log(data);
      }
  });
});


/* POST to save one comment info. */
router.post('/comment', function(req, res) {
    postService.saveComment(req.body.postId, req.body.postContent,function(err, data){
        res.send(data);
    });
});

module.exports = router;
