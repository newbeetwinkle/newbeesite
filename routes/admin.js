var express = require('express');
var router = express.Router();
var adminService = require('../service/adminService');
var postService = require('../service/postService');
var util = require('../utils');
var path = require('path');

router.all("/ueditor", util.ueditor('public', function(req, res, next) {
  // ueditor 客户发起上传图片请求
  if(req.query.action === 'uploadimage'){
    var date = new Date();
    var imgname = req.ueditor.filename;

    var img_url = '/upload/img/'+date.getTime()+imgname;
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = '/upload/img/';
    res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/ueditor.config.json');
  }
}));


router.use(util.checkLogin);

/* GET admin home page. */
router.get('/', function(req, res) {
	res.render('admin',{});
	// postService.queryAllPost(function(e, posts){
	// 	posts.forEach(function(element, index, array){
	// 		if(element.content && element.content.length > 100){
	// 			element.content = element.content.substring(0, 100) + "...";
	// 		}
	// 	});
	// 	res.render('index',{"posts":posts});
	// })
});

router.get('/post',function(req, res) {
	res.render('editpost',{"act":"new"});
});

router.post('/post',function(req, res) {
    var post = {
        title: req.body.title,
        content : req.body.content,
        author: req.session.user._id,
        postId: req.body.postId
    }
    adminService.savePost(req.body.act, post, function(err, success){
        if(success){
            res.redirect('/');
        } else{
            res.send(err);
        }
    });
});

router.get('/user',function(req,res){
	adminService.showUsers(function(err,users){
		if (users) {			
			res.render("userManage",{"users":users});
		} else {
			req.flash("error","查询用户失败");
			res.redirect("/admin");
		}
	});
})

/* My post page */
router.get('/myposts',function(req,res){
     postService.queryUserPost(req.session.user._id, function(err, doc){
         if(err){
             res.send(err);
         } else {
             res.render("myposts",{"posts":doc});
         }
     });
})

/* modify one post */
router.get('/myposts/:postId',function(req,res){
    postService.queryOnePost(req.params.postId, function(err, doc){
        if(err){
            res.send(err);
        } else {
            res.render("editpost",{"post":doc, "act":"modify"});
        }
    });
})

/* delete post */
router.delete('/post/:postId', function(req, res){
    adminService.deletePost(req.params.postId, function(err, result){
       if(err){
           res.send(err);
       } else {
           res.send(result);
       }
    });
})

module.exports = router;
