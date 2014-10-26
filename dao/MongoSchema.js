/**
 * Created by MacBookAir on 10/26/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Post schema
var _Post = new Schema({
    author : Schema.Types.ObjectId,
    category : Schema.Types.ObjectId,
    content : String,
    viewCount : Number,
    createTime : { type: Date, default: Date.now },
    modifyTime : { type: Date, default: Date.now },
    deleted : Boolean,
    comments : [{
        user : Schema.Types.ObjectId,
        content : String,
        commentTime : { type: Date, default: Date.now },
        deleted : Boolean
    }]
});

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

// export them
exports.Post = mongoose.model('Post', _Post);
exports.User = mongoose.model('User', _User);
exports.Category = mongoose.model('Category', _Category);