var mongoose = require('mongoose');
var Utils = require('../Utils.js');
var Schema = mongoose.Schema;


// Define Comment schema
var _Comment = new Schema({
    postId : Number,
    commentId : String, // postId+timestamp
    user :{ type: Schema.Types.ObjectId, ref: 'User' },
    content : String,
    commentTime : { type: Date, default: Date.now },
    deleted : { type: Boolean, default: false }
});

var CommentModel = mongoose.model('Comment', _Comment);

/* Add comment */
exports.addComment = function(postId, postContent, user, callback){
    var commentTime = Date.now();
    var commentId = postId + '' + commentTime;
    var comment = new CommentModel({
        postId : postId,
        commentId : commentId,
        user : user._id,
        content : postContent
    });
    comment.save(function(err){
        if(err) {
            callback(err);
        }else{
            callback(null, comment, user);
        }
    });
}

/* get comments count of one post */
exports.getCommentsCount = function(postId, callback){
    CommentModel.count({postId : postId}, function(err, count){
        if(err){
            callback(err);
        }else{
            callback(err, count);
        }
    });
}

/* find comments */
exports.findComments = function(postId, index, count, callback){
    CommentModel.find({postId : postId})
        .populate('user')
        .sort({commentTime: -1})
        .skip(index)
        .limit(count)
        .find(function(e, doc){
            if(e){
                callback(e);
            } else {
                callback(null,doc);
            }
    });
}
