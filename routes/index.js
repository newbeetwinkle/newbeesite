var express = require('express');
var router = express.Router();
var postService = require('../service/postService');
var util = require('../utils');


/* GET home page. */
router.get('/', function(req, res) {
	var searchPost = req.query.searchPost;
	postService.queryPostByContent(searchPost, function(e, posts){
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


module.exports = router;
