var mongoose = require('mongoose');
var Utils = require('../Utils.js');
var Schema = mongoose.Schema;



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
    deleted : { type: Boolean, default: false },
    comments : [{
        commentId : String, // postId+timestamp
        user :{ type: Schema.Types.ObjectId, ref: 'User' },
        content : String,
        commentTime : { type: Date, default: Date.now },
        deleted : { type: Boolean, default: false }
    }]
});

var PostModel = mongoose.model('Post', _Post);

exports.findOnePost = function(postId,callback){

    // query, update, options
    PostModel.findOneAndUpdate({postId : postId}, {$inc : {viewCount : 1}}, {new : true})
        .populate('author')
        .populate('comments.user')
//        .slice('comments', 2)
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

/* Add comment */
exports.addComment = function(postId, postContent, user, callback){
    var commentTime = Date.now();
    var commentId = postId + '' + commentTime;
    PostModel.findOneAndUpdate({postId : postId},
        {$push : {comments : {commentId : commentId, user : user._id, content : postContent, commentTime : commentTime}}},
        {new : true},
        function (err, data) {
            if(err) {
                callback(err);
            }else{
                var result = {};
                result.nickname = user.nickname;
                result.emailMd5 = user.emailMd5;
                result.content = postContent;
                result.time = Utils.dateFormat(commentTime);
                callback(null, result);
            }
    })
};
