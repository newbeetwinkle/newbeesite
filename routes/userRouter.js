var express = require('express');
var router = express.Router();
var userService = require('../service/userService');

/* GET users listing. */
router.get('/register',function(req,res){
	res.render('login');
});

router.post('/register', function(req, res) {
  userService.addUser(req.body.username,function(){
  	res.send("register " + req.body.username + " sueccess!");
  });
});

router.get('/query/:username', function(req, res){
	userService.queryAllUser(function(err, data){
		if(err){
			res.send("query " + req.params.username + "failed!");
		} else{
			res.send(data);
		}
	})
})
console.info("user>>>>>");
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
