var express = require('express');
var router = express.Router();
var userService = require('../service/userService');
var util = require('../utils');

//locals is used to change the view dynamic
router.use(function(req,res,next){
 res.locals.user = req.session.user;
 var err = req.flash("error");
 res.locals.error =  err.length ? err : null ;
 var success = req.flash("success");
 res.locals.success = success.length ? success : null ;
  next();
});

/* GET users listing. */
// router.get('/register',checkLogin);
router.get('/register',function(req,res){
	res.render('register');
});

// router.post('/register',checkLogin); 
router.post('/register', function(req, res) {
	if (req.body['confirmPassword'] != req.body['password']) {
		req.flash('error','两次输入的密码不一致！');
		res.redirect('/users/register');
	} else {
 		 userService.addUser(
 		 	req.body.username,
 		 	req.body.password,
 		 	req.body.nickname,
 		 	req.body.telephone,
 		 	req.body.addr,
 		 	req.body.email,
 		 	function(){
  				req.flash("success",req.body.username+"注册成功");
  				res.redirect('/users/login');
  			}
  		)
	}
});

//use locals to dynamic change content of module engine
router.use(function(req,res,next){
	res.locals.user = req.session.user;
	next();
});

router.all('/login',util.checkNotLogin);
router.get('/login',function(req,res){
	res.render('login');
});

router.post('/login',function(req,res){
	userService.login(req.body.username,req.body.password,function(err ,data){	
		if (data) {
			req.session.user = data;
			//why here is not ok to response
			// req.flash("success",req.body.username+"登录成功！");
			res.redirect('/');
		} else {			
			req.flash("error","登录失败！");
 			res.redirect("/users/login");
		}		
	})	
  });

router.all('logout',util.checkNotLogin);
router.get('/logout',function(req,res){
	req.session.user = null;
	res.redirect("/");
})

router.get('/queryAllUser', util.checkLogin);
router.get('/queryAllUser', function(req, res){
	userService.queryAllUser(function(err, data){
		if(err){
			res.send("query  all user failed!");
		} else{
			res.send(data);
		}
	})
})

router.get('/query/:username', function(req, res){
	userService.queryAllUser(function(err, data){
		if(err){
			res.send("query " + req.params.username + "failed!");
		} else{
			res.send(data);
		}
	})
})
router.get('',function(req,res){
	res.render('login');
})

router.post('',function(req,res){
	userService.login(req.body.username,req.body.password,function(err,data){
		if(err){
			res.send("query " + req.body.username + "failed!");
		} else{
			res.send(data);
		}
	})
})

module.exports = router;
