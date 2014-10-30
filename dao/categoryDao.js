var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Category schema
var _Category = new Schema({
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