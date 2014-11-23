var mongoose = require('mongoose');
var Utils = require('../utils.js');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
require('./db');

// Define Post schema
var _Post = new Schema({
    title : String,
    author : { type: Schema.Types.ObjectId, ref: 'User' },
    category : { type: Schema.Types.ObjectId, ref: 'Category' },
    content : String,
    viewCount : Number,
    postId : Number,
    createTime : { type: Date, default: Date.now },
    modifyTime : { type: Date, default: Date.now },
    deleted : { type: Boolean, default: false }
});

_Post.plugin(autoIncrement.plugin, {
    model:'Post',
    field:'postId',
    startAt:10000
});
var PostModel = mongoose.model('Post', _Post);

exports.findOnePost = function(postId,callback){

    // query, update, options
    PostModel.findOneAndUpdate({postId : postId, deleted : false}, {$inc : {viewCount : 1}}, {new : true})
        .populate('category')
        .populate('author')
        .exec(function (err, data) {
            if(err) {
                callback(err);
            }else{
                callback(null, data);
            }
    });
};

exports.findAllPost = function(callback){
    PostModel.find({deleted : false})
    .populate('author')
    .populate('category')
    .sort({createTime: -1}).
    find(function(e, doc){
        if(e){
            callback(e);
        } else {
            callback(null,doc);
        }
    })
};

exports.findPostByContent = function(content,callback) {
    var pattern = new RegExp(content, "i");
    PostModel.find({
        "$or":[{title:pattern}, {content:pattern}],
        deleted : false
    })
    .populate('category')
    .populate('author')
    .sort({createTime: -1}).find(function(e, doc){
        if(e){
            callback(e);
        }else {
            callback(null, doc);
        }
    });
};

/* Find one user's posts */
exports.findUserPost = function(user_id, callback){
    PostModel.find({author: user_id, deleted : false})
        .populate('author')
        .sort({createTime: -1})
        .find(function(e, doc){
            if(e){
                callback(e);
            } else {
                callback(null,doc);
            }
    })
};

exports.addPost = function(postObject,callback){
        var post = new PostModel({
            title : postObject.title,
            category : postObject.category,
            content : postObject.content,
            author : postObject.author
        });
    post.save(function(){
        callback();
    });
}

/* Delete post */
exports.deletePost = function(postId,callback){
    PostModel.findOneAndUpdate({postId : postId},
        {$set : {deleted : true} },
        {new : true},
        function (err, data) {
            if(err) {
                callback(err);
            }else{
                callback(null, data);
            }
        });
}

/* modify one post */
exports.modifyPost = function(postObject,callback){
    PostModel.findOneAndUpdate({postId : postObject.postId},
        {$set : {title : postObject.title, content : postObject.content,category:postObject.category, modifyTime : Date.now()}},
        {new : true},
        function (err, data) {
            if(err) {
                callback(err);
            }else{
                callback(null, data);
            }
        });
}