var express = require('express');
var router = express.Router();
var postService = require('../service/postService');

/* GET one post info. */
router.get('/:postId', function(req, res) {
  postService.queryOnePost(req.params.postId,function(err, post){
      if(err){
          res.send("query " + req.params.postId + "failed!");
      } else{
          postService.queryComments(req.params.postId, 0, 5, function(error, comment){
              if(error){
                  res.send("query comments failed!");
              }else{
                  res.render('detail',{"post":post, "comments":comment});
              }

          });
      }
  });
});


/* POST to save one comment info. */
router.post('/comment', function(req, res) {
    postService.saveComment(req.body.postId, req.body.postContent,function(err, comment, user){
        var result  = {};
        result['comment'] = comment;
        result['user'] = user;
        res.send(result);
    });
});

module.exports = router;
