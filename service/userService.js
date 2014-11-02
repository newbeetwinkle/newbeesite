var userDao = require('../dao/userDao');

exports.addUser = function(username,password,nickname,phone,address,email,callback){
	userDao.insertUser(username,password,nickname,phone,address,email,callback);
};


exports.queryAllUser = function(callback){
	userDao.findAllUser(callback);
};

exports.login = function(username,password,callback){
	userDao.userLogin(username,password,callback);
};

exports.findOneUser = function(username,callback){
    	userDao.findOneUser(username,callback);
};