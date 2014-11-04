var express = require('express');
var router = express.Router();
var userService = require('../service/userService');
var postService = require('../service/postService');
var util = require('../utils');

/* GET users listing. */
// router.get('/register',checkLogin);
router.get('/register',function(req,res){
	res.render('register');
});

// router.post('/register',checkLogin); 
router.post('/register', function(req, res) {
	if (req.body['confirmPassword'] != req.body['password']) {
		// req.flash('error','两次输入的密码不一致！');
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
  				// res.send("register  sueccess!");
  				res.redirect('/users/login');
  			}
  		)
	}
});

router.all('/login',util.checkNotLogin);
router.get('/login',function(req,res){
	res.render('login');
});

router.post('/login',function(req,res){
	userService.login(req.body.username,req.body.password,function(err ,data){	
		if (data) {
			res.send(req.body.username+"login successful!");
			req.session.user = req.body.username;
			res.redirect('/');
		} else {
			res.send(req.body.username+"login failed!Please cotact administartor at 110");
		}		
	})	
  });

router.get('/queryAllUser', util.checkLogin);
router.get('/queryAllUser', function(req, res){
	userService.queryAllUser(function(err, data){
		if(err){
			res.send("query  all user failed!");ch
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
	console.info("userlogin");
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
