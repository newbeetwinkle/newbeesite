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
    role : Number,  // 0-管理员；1-普通用户
    deleted : Boolean  // 0未删除，1已删除
});

var UserModel = mongoose.model('User', _User);

exports.insertUser = function(username,password,nickname,phone,address,email,callback){
	var user = new UserModel({
		username: username,
		password:password,
	   	nickname:nickname,
	   	phone:phone,
	   	address:address,
	   	email:util.md5(email),
	    });
	user.save(function(){
		callback();
	});
};

exports.findAllUser = function(callback){
	UserModel.find({},function(e, users){
		if(e) {
			callback(e);
		}else{
			callback(null,users);
		}
	});
};

exports.userLogin = function(username,password,callback){
	UserModel.findOne({"username": username , "password": password}, {"username" : 1, "nickname" : 1, "_id" : 1, "emailMd5" : 1} , function(err , docs){
		if (docs) {
			callback(err,docs);
		} else {
			callback(err,null);
		}
	});
};

exports.findOneUser = function(username,callback){
    UserModel.findOne({username:username}, function(e, docs){
        if(e) {
            callback(e);
        }else{
            callback(null, docs);
        }
    });
};