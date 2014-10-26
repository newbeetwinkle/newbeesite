var mongoose = require('mongoose');
// require('./db')
var Schema = mongoose.Schema;

// Define User schema
var _User = new Schema({
    nickname : String,
    username : String,
    password : String,
    email : String,
    phone : String,
    address : String,
    registerTime : { type: Date, default: Date.now },
    userIP : String,
    lastLoginTime : { type: Date, default: Date.now },
    role : Number,  // 0-管理员；1-普通用户
    deleted : Boolean
});

var UserModel = mongoose.model('User', _User);

exports.insertUser = function(username,callback){
	var user = new UserModel({
		username: username,
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