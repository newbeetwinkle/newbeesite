var express = require('express');
var router = express.Router();
var userService = require('../service/userService');

/* GET users listing. */
router.get('/register/:username', function(req, res) {
  userService.addUser(req.params.username,function(){
  	res.send("register " + req.params.username + " sueccess!");
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

module.exports = router;
