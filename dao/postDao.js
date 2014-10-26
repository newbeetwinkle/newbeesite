var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Post schema
var _Post = new Schema({
    title : String,
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

var PostModel = mongoose.model('Post', _Post);

exports.findOnePost = function(postId,callback){
    var post = new PostModel({
    });
    post.find({}, function(){
        callback();
    });
};