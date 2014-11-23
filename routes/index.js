var express = require('express');
var router = express.Router();
var postService = require('../service/postService');
var Constant = require('../Constant.js');
var util = require('../utils');


/* GET home page. */
router.get('/', function(req, res) {
	var searchPost = req.query.searchPost;
	postService.queryPostByContent(searchPost, 0, Constant.ONE_PAGE_POST_COUNT, function(e, posts){
        postService.queryHotPostList(function(err, hotPosts){
            if(hotPosts){
                posts.forEach(function(element, index, array){
                    if(element.content){
                        var pureText = util.removeHTMLTag(element.content);
                        if(pureText.length > 500){
                            pureText = pureText.substring(0, 500) + " [......]";
                        }
                        pureText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + pureText;
                        element.content = pureText;
                        if(typeof(element.viewCount) == "undefined")
                            element.viewCount = 0;
                    }
                });
                res.render('index',{"posts":posts,"user":req.session.user,"hotPosts":hotPosts});
            }
        });
	});
});

router.post('/', function(req, res){
    var pageNow = req.body.pageNow;
    var index = 0;
    if (pageNow) {
        index = (pageNow - 1) * Constant.ONE_PAGE_COMMENT_COUNT;
    }else{
        index = 0;
    }
    var searchPost = req.query.searchPost;
    postService.queryPostByContent(searchPost, index, Constant.ONE_PAGE_POST_COUNT, function(e, posts){
        posts.forEach(function(element, index, array){
            if(element.content){
                var pureText = util.removeHTMLTag(element.content);
                if(pureText.length > 500){
                    pureText = pureText.substring(0, 500) + " [......]";
                }
                pureText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + pureText;
                element.content = pureText;
                if(typeof(element.viewCount) == "undefined")
                    element.viewCount = 0;
            }
        });
        var result = '';
        if(posts != undefined && posts != '' && posts.length != 0 ) {
            for(var i = 0; i<posts.length;i++){
                result += makePostUnit(posts[i]);
            }
        }
        res.send(result);
    });
});

function makePostUnit(post){
    return '<li><section class="well"><a href="/posts/'
        + post.postId + '"><span class="post_title">'
        + post.title + '</span></a>' + '<div class="post_summary">'
        + post.content +'</div><div><span class="post_time">发布于 '
        + util.dateFormat(post.createTime) + '</span><span class="post_view_count_main">浏览：'
        + post.viewCount + '&nbsp;&nbsp;&nbsp;&nbsp;回复：'
        + post.commentCount + '</span></div></section></li>';
}

module.exports = router;
