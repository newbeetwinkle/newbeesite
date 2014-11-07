var express = require('express');
var router = express.Router();
var postService = require('../service/postService');
var Constant = require('../Constant.js');
var utils = require('../utils.js');


/* GET one post info. */
router.get('/:postId?', function(req, res) {
  postService.queryOnePost(req.params.postId,function(err, post){
      if(err){
          res.send("query " + req.params.postId + "failed!");
      } else{
          var pageNow = req.query.pageNow;
          var index = 0;
          if (pageNow) {
                index = (pageNow - 1) * Constant.ONE_PAGE_COMMENT_COUNT;
          }else{
                index = 0;
          }
          postService.queryComments(req.params.postId, index, Constant.ONE_PAGE_COMMENT_COUNT, function(error, comment){
              if(error){
                  res.send("query comments failed!");
              }else{
                  pageCount = post.commentsCount / Constant.ONE_PAGE_COMMENT_COUNT;
                  res.render('detail',{"post":post, "comments":comment, "pageNow":pageNow, "pageCount":pageCount });
              }

          });
      }
  });
});


/* POST to save one comment info. */
router.post('/comment', function(req, res) {
    postService.saveComment(req.body.postId, req.body.postContent, req.session.user, function(err, comment, user){
        var result  = {};
        result['comment'] = comment;
        result['commentTimeStr'] = utils.dateFormat(comment.commentTime);
        result['user'] = user;
        res.send(result);
    });
});

module.exports = router;
