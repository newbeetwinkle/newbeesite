var express = require('express');
var router = express.Router();
var postService = require('../service/postService');
var Constant = require('../Constant.js');

//locals to change module dynamic
router.use(function(req,res,next){
  res.locals.user = req.session.user;
  next();
});



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
                  var pageCount = 1;
                  pageCount = post.commentsCount / Constant.ONE_PAGE_COMMENT_COUNT;

                  res.render('detail',{"post":post, "comments":comment, "pageNow":pageNow, "pageCount":pageCount });
              }

          });
      }
  });
});


/* POST to save one comment info. */
router.post('/comment', function(req, res) {
     var commentPermission = req.session.user ? true : false ;
     console.info(commentPermission);
     if(commentPermission){
    postService.saveComment(req.body.postId, req.body.postContent, req.session.user, function(err, comment, user){
        var result  = {};
        result['comment'] = comment;
        result['user'] = user;
        res.send(result);
    }); 
     }
     else req.flash("error","please login first!");
});

module.exports = router;
