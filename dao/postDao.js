var mongoose = require('mongoose');
var utils = require('../utils.js');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
require('./db');

// Define Post schema
var _Post = new Schema({
    title : String,
    author : { type: Schema.Types.ObjectId, ref: 'User' },
    category : { type: Schema.Types.ObjectId, ref: 'Category' },
    content : String,
    viewCount : { type: Number, default: 0 },
    commentCount :  { type: Number, default: 0 },
    hotScore :  { type: Number, default: 0 },
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

exports.findPostByContent = function(content, index, count, callback) {
    var pattern = new RegExp(content, "i");
    PostModel.find({
        "$or":[{title:pattern}, {content:pattern}],
        deleted : false
    })
        .populate('category')
        .populate('author')
        .skip(index)
        .limit(count)
        .sort({createTime: -1})
        .find(function(e, doc){
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

/* get comments count of one post */
exports.getCommentsCount = function(postId, callback){
    PostModel.find({postId: postId}, {commentCount : 1})
        .find(function(e, doc){
            if(e){
                callback(e);
            } else {
                callback(null,doc);
            }
        })
}

exports.incCommentCount = function(postId, callback){
    PostModel.update({postId : postId, deleted : false}, {$inc : {commentCount : 1}}, function(e, doc){
        if(e){
            callback(e);
        } else {
            callback(null,doc);
        }
    })
}

exports.findHotPostList = function(callback){
    PostModel.find({deleted : false})
        .populate('author')
        .sort({hotScore: -1})
        .limit(5)
        .find(function(e, doc){
            if(e){
                callback(e);
            } else {
                callback(null,doc);
            }
        })
};

exports.updateHotScore = function(callback){
    this.findAllPost(function(err, posts){
        if(err){
            callback(err);
        } else {
            posts.forEach(function(post){
                var score = utils.getHotScore(post.createTime, post.viewCount, post.commentCount);
                console.log("post: " + post.title + " score " + score);
                PostModel.update({postId : post.postId, deleted : false}, {$set : {hotScore : score}}, function(err){
                });
            });
        }
    });
}
