var userDao = require('../dao/userDao');

exports.addUser = function(username,callback){
	userDao.insertUser(username,callback);
};


exports.queryAllUser = function(callback){
	userDao.findAllUser(callback);
};

exports.findOneUser = function(username,callback){
    userDao.findOneUser(username,callback);
};