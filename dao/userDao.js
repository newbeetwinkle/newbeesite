var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require("../utils");

// Define User schema
var _User = new Schema({
    nickname : String,
    username : String,
    password : String,
    emailMd5 : String,
    email : String,
    phone : String,
    address : String,
    registerTime : { type: Date, default: Date.now },
    userIP : String,
    lastLoginTime : { type: Date, default: Date.now },
    role : { type : Number , default : 1},  // 0-管理员；1-普通用户
    deleted : { type: Boolean , default : false },  // false未删除，true已删除
    isVerify : {type : Boolean , default : false } //false means not while true means yes
});

var UserModel = mongoose.model('User', _User);

exports.insertUser = function(username,password,nickname,phone,address,email,callback){
	var user = new UserModel({
		username: username,
		password:password,
	   	nickname:nickname,
	   	phone:phone,
	   	address:address,
        email:email,
        emailMd5:util.md5(email)
	    });
	user.save(function(err){
		if (err) {
			callback(err);
		}else{			
			callback(null,true);
		}
	});
};

exports.findAllUser = function(callback){
	UserModel.find({"deleted":false},function(e, users){
		if(e) {
			callback(e);
		}else{
			callback(null,users);
		}
	});
};

exports.userLogin = function(username,password,callback){
	UserModel.findOne({"username": username , "password": password , "isVerify" : true}, {"username" : 1, "nickname" : 1, "_id" : 1, "emailMd5" : 1 , "role" : 1} , function(err , docs){
		if (docs) {
			callback(err,docs);
		} else {
			callback(err,null);
		}
	});
};

exports.findOneUser = function(username,callback){
    UserModel.findOne({"username":username}, function(e, user){
        if(e) {
            callback(e);
        }else{
            callback(null, user);
        }
    });
};

exports.findUserById = function(userId,callback){
	UserModel.findOne({"_id":userId},function(e,user){
		if (e) {			
			callback(e);
		}else{
			callback(null,user);
		}
	})
};

exports.deleteUser = function(userId,callback){
	UserModel.update({"_id":userId},{"deleted":true},function(e,status){
		if (e) {
			callback(e);
		}else{
			callback(null,true);
		}
	});//deleted logic
};

exports.updateUser = function(userId,username,nickname,email,role,callback){
	UserModel.update({"_id":userId},{"username":username,"nickname":nickname,"email":email,"emailMd5":util.md5(email),"role":role},function(e,status){
		if (e) {
			callback(e);
		}else{
			callback(null,true);
		}
	});
};

exports.allUser = function(callback){
	UserModel.find(function(err,users){
		if (err) {
			callback(err);
		}else{
			callback(null,users);
		}
	});
};

exports.verifyUser = function(username,callback){
	UserModel.update({"username":username},{"isVerify" : true},function(err,user){
		if (err) {
			callback(err);
		}else{
			callback(null,user);
		}
	});
};

exports.checkUser = function(username,email,callback){
	UserModel.findOne({"username":username,"email":email},function(err,status){
		if (err) {
			callback(err);
		}else if (status) {
			callback(null,true);
		}else{
			callback(null,false);
		}
	})
};

exports.findPwd = function(username,callback){
	UserModel.update({"username":username},{"password":"newbee"},function(err,status){
		if (err) {
			callback(err);
		}else{
			callback(null,true);
		}
	});
};

exports.findUserPwdByUserId = function(userId,callback){
	UserModel.find({"_id":userId},{"password":1},function(err,password){
		if (err) {
			callback(err);
		} else {
			callback(null,password);
		}
	})
};

exports.updatePasswordByUserId = function(userId,callback){
	// UserModel.update({"userp"})
}