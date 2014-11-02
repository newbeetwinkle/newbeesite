var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

exports.insertUser = function(username,callback){
	var user = new UserModel({
		username: username,
        nickname : "geziQiang",
        phone: 13512220002,
        registerTime:Date.now(),
        lastLoginTime:Date.now(),
        role:1,
        deleted:0,
        email: "fengguiyushao@gmail.com"
    });
	user.save(function(){
		callback();
	});
};

exports.findAllUser = function(callback){
	UserModel.find({},function(e, docs){
		if(e) {
			callback(e);
		}else{
			callback(null,JSON.stringify(docs));
		}
	});
};

exports.userLogin = function(username,password,callback){
	UserModel.find({},{"username" : username , "password" : password} , function(e , docs){
		if (e) {
			callback(e);
		} else {
			callback(null,JSON.stringify(docs));
		}
	});
};

exports.findOneUser = function(username,callback){
    UserModel.findOne({"username":username}, function(e, docs){
        if(e) {
            callback(e);
        }else{
            callback(null, docs);
        }
    });
};