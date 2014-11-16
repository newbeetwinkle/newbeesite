var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
require('./db');

// Define Post schema
var _Post = new Schema({
    title : String,
    author : { type: Schema.Types.ObjectId, ref: 'User' },
    category : Schema.Types.ObjectId,
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
    PostModel.findOneAndUpdate({postId : postId}, {$inc : {viewCount : 1}}, {new : true})
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
    PostModel.find({}).sort({createTime: -1}).find(function(e, doc){
        if(e){
            callback(e);
        } else {
            callback(null,doc);
        }
    })
};

/* Find one user's posts */
exports.findUserPost = function(user_id, callback){
    PostModel.find({author: user_id})
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
            content : postObject.content,
            author : postObject.author
        });
    post.save(function(){
        callback();
    });
}

/* modify one post */
exports.modifyPost = function(postObject,callback){
    PostModel.findOneAndUpdate({postId : postObject.postId},
        {$set : {title : postObject.title, content : postObject.content, modifyTime : Date.now()}},
        {new : true},
        function (err, data) {
            if(err) {
                callback(err);
            }else{
                callback(null, data);
            }
        });
}