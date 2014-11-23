var express = require('express');
var router = express.Router();
var userService = require('../service/userService');
var util = require('../utils');
var nodemailer = require("nodemailer");

// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport("SMTP",{
  host: "smtp.163.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: "newbeeblog@163.com", // 账号
    pass: "newbee" // 密码
  }
});

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

router.get('/fogetpwd',function(req,res){
	res.render('forgetpwd');
});

router.post('/fogetpwd',function(req,res){
	userService.checkUser(req.body.username,req.body.email,function(err,status){
		if (err) {
			res.render('error');
		}else if (status) {
			var mailText = "点击下面的链接重置密码:";
			var footerText = "<br/>Newbee Blog will be your new begining......";
			// 设置邮件内容
			var mailOptions = {
			  from: "Newbee Group<newbeeblog@163.com>", // 发件地址
			  to: req.body.email, // 收件列表
			  subject: "Please click the hyperLink to find your password", // 标题
			  html: mailText+'<a href="http://localhost:3000/users/findPwd/'+ req.body.username +'">重置密码</a>'+footerText // html 内容
			}
			// 发送邮件
			smtpTransport.sendMail(mailOptions, function(error, response){
			  if(error){
			    console.log(error);
			  }else{
			    console.log("Message sent: " + response.message);
			  }
			  smtpTransport.close(); // 如果没用，关闭连接池
			});			
			// req.flash("success",req.body.username+"注册成功");
			res.render("mailSecure",{"content":"请登录邮箱重置密码！"});
		}else{
			req.flash('error',"用户名或邮箱错误");
			res.redirect('/users/fogetpwd');
		}
	})
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
 		 	function(err,status){
  				if (err) {
  					res.render("error");
  				}else if (status) {
  					req.flash("success",req.body.username+"注册成功");
  					var mailText = "欢迎注册newbeeblog,请点击链接验证账户:";
  					var footerText = "<br/>Newbee Blog will be your new begining......";
  					// 设置邮件内容
  					var mailOptions = {
  					  from: "Newbee Group<newbeeblog@163.com>", // 发件地址
  					  to: req.body.email, // 收件列表
  					  subject: "Please click the hyperLink to verify your account", // 标题
  					  html: mailText+'<a href="http://localhost:3000/users/verify/'+ req.body.username +'">点击验证</a>'+footerText // html 内容
  					}
  					// 发送邮件
  					smtpTransport.sendMail(mailOptions, function(error, response){
  					  if(error){
  					    console.log(error);
  					  }else{
  					    console.log("Message sent: " + response.message);
  					  }
  					  smtpTransport.close(); // 如果没用，关闭连接池
  					});
  					res.render("mailSecure",{"content":"请登录邮箱激活账户！"});
  					// res.redirect('/users/login');  					
  				}else{
  					req.flash("error","用户名"+req.body.username+"已经存在!");
  					res.redirect('/users/login');
  				}
  			}
  		)
	}
});

//verify account
router.get('/verify/:username',function(req,res){
	userService.verifyUser(req.params.username,function(err,user){
		if (err) {
			res.render("error");
		}else{
			req.flash("success","User has been verified!");
			res.redirect("/users/login");
		}
	});
});

//find password
router.get('/findPwd/:username',function(req,res){
	userService.findPwd(req.params.username,function(err,user){
		if (err) {
			res.render("error");
		}else{
			req.flash("success","Your password has been changed to: newbee,please remenber it!");
			res.redirect("/users/login");
		}
	});
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
	userService.login(req.body.username,req.body.password,function(err ,user){	
		if (user) {
			req.session.user = user;
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

router.get('/userlist',function(req,res){
	userService.allUser(function(err,users){
		if (err) {
			res.render("error");
		}else{
			res.render("userlist",{"users":users});
		}
	})
});

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
