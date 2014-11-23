var express = require('express');
var router = express.Router();
var adminService = require('../service/adminService');
var postService = require('../service/postService');
var userService = require("../service/userService");
var categoryService = require('../service/categoryService');
var util = require('../utils');
var path = require('path');

//locals is used to change the view dynamic
router.use(function(req,res,next){
 res.locals.user = req.session.user;
 var err = req.flash("error");
 res.locals.error =  err.length ? err : null ;
 var success = req.flash("success");
 res.locals.success = success.length ? success : null ;
  next();
});


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
    categoryService.queryAllCategory(function(err,categorys){
        if(err){
            res.send(err);
        }else {
           res.render('editpost',{"categorys": categorys, "act":"new"});
        }
  });
});

router.post('/post',function(req, res) {
    var post = {
        title: req.body.title,
        content : req.body.content,
        category : req.body.category,
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

router.get('/category', function(req, res){
  categoryService.queryAllCategory(function(err,categorys){
    if(err){
      res.send(err);
    }else {
      res.render('categoryManager', {"categorys":categorys});
    }
  });
});

router.post('/addCategory', function(req, res){
  categoryService.addCategory(req.body.categoryName, function(err){
      var result={"err":err};
      res.send(result);
  })
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
});

router.get("/user/delete/:userId",function(req,res){
    userService.deleteUser(req.params.userId,function(err,status){
      if (err) {
        res.render("error");
      }else{
        req.flash("success","Delete user success!");
        res.redirect("/admin/user");
      }
    })
})

router.get("/user/update/:userId",function(req,res){
    var user = userService.findUserById(req.params.userId,function(e,user){
      if (e) {
        res.render("error");
      }else{
        res.render("modifyUser",{"user":user});
      }
    })

})

router.post("/user/update/:userId",function(req,res){
    userService.findUserById(req.params.userId,function(e,user){
        var username = req.body.username;
        var nickname = req.body.nickname;
        var email = req.body.email;
        var role = ( req.body.role == "普通用户" ? 1 : 0 );
        userService.updateUser(req.params.userId,username,nickname,email,role,function(e,status){
          if (e) {
            res.render("error");
          }else{
            req.flash("success","Update user success!");
            res.redirect("/admin/user");
          }
        });
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
            categoryService.queryAllCategory(function(e,categorys){
                  if(e){
                    res.send(e);
                  }else {
                    console.info(doc.category);
                    res.render('editpost', {"post":doc, "act":"modify","categorys":categorys});
                  }
            });
        }
    });
})

router.get('/allposts', function(req, res){
    postService.queryAllPost(function(err, doc){
         if(err){
             res.send(err);
         } else {
             res.render("myposts",{"posts":doc});
         }
     });
});


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
