var express = require('express');
var router = express.Router();
var adminService = require('../service/adminService');
var util = require('../utils');

/* GET admin home page. */
router.use(util.checkLogin);
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
	res.render('editpost',{});
});

router.post('/post',function(req, res) {
	adminService.savePost(req.body.content, req.session.user._id, function(err, success){
		if(success){
			res.redirect('/admin');
		} else{
			res.send(err);
		}
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
})

module.exports = router;
