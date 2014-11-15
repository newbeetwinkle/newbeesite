var express = require('express');
var router = express.Router();
var postService = require('../service/postService');
var Constant = require('../Constant.js');
var utils = require('../utils.js');
var flash = require("connect-flash");
router.use(flash());

//locals to change module dynamic
router.use(function(req,res,next){
 res.locals.user = req.session.user;
 var err = req.flash("error");
 res.locals.error =  err.length ? err : null ;
 var success = req.flash("success");
 res.locals.success = success.length ? success : null ;
  next();
});

/* GET one post info. */
router.get('/:postId', function(req, res) {
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
     var commentPermission = req.session.user ? true : false ;
     console.info(commentPermission);
     if(commentPermission){
        postService.saveComment(req.body.postId, req.body.postContent, req.session.user, function(err, comment, user, count){
            var result  = {};
            result['comment'] = comment;
            result['commentTimeStr'] = utils.dateFormat(comment.commentTime);
            result['user'] = user;
            result['count'] = count;
            res.send(result);
        });
     }
     else {
         console.info("please login");
         req.flash("error" , "请登录!");
         res.redirect("/posts/comment");
     }
});

/* Get comments list. */
router.post('/comment_list', function(req, res) {
    var pageNow = req.body.pageNow;
    var index = 0;
    if (pageNow) {
        index = (pageNow - 1) * Constant.ONE_PAGE_COMMENT_COUNT;
    }else{
        index = 0;
    }
    postService.queryComments(req.body.postId, index, Constant.ONE_PAGE_COMMENT_COUNT, function(error, comment){
        if(error){
            res.send("query comments failed!");
        }else{
            var result = '';
            if(comment != undefined && comment != '' && comment.length != 0 ) {
                for(var i = 0; i<comment.length;i++){
                    result += makeCommentUnit(comment[i].user.emailMd5, comment[i].user.nickname, comment[i].content, utils.dateFormat(comment[i].commentTime));
                }
            }
            res.send(result);
        }
    });
});

function makeCommentUnit(emailMd5, nickname, content, commentTime){
    return '<li><img class="comment_avatar shadow" src="http://www.gravatar.com/avatar/' + emailMd5 + '?s=80">' +
        '<div class="comment_text"><label class="comment_nickname">' + nickname + '</label>' +
        '<p class="comment_comment_area">' + content + '</p>' +
        '<time class="comment_comment_time">' + commentTime + '</time></div></li>';
}

module.exports = router;
