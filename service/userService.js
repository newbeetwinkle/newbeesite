var userDao = require('../dao/userDao');

exports.addUser = function(username,password,nickname,phone,address,email,callback){
	userDao.findOneUser(username,function(err,user){
		if (user) {
			callback(null,false);
		}else{
			userDao.insertUser(username,password,nickname,phone,address,email,callback);
		}
	});	
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

exports.findUserById = function(userId,callback){
		userDao.findUserById(userId,callback);
};

exports.deleteUser = function(userId,callback){
	userDao.deleteUser(userId,callback);
};

exports.updateUser = function(userId,username,nickname,email,role,callback){
	userDao.updateUser(userId,username,nickname,email,role,callback);
};

exports.allUser = function(callback){
	userDao.allUser(callback);
};

exports.verifyUser = function(username,callback){
	userDao.verifyUser(username,callback);
};

exports.checkUser = function(username,email,callback){
	userDao.checkUser(username,email,callback);
};

exports.findPwd = function(username,callback){
	userDao.findPwd(username,callback);
};

exports.findUserPwdByUserId = function(userId,callback){
	userDao.findUserPwdByUserId(userId,callback);
};

exports.updatePasswordByUserId = function(userId,callback){
	userDao.updatePasswordByUserId(userId,callback);
};