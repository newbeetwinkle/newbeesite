var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Define Post schema
var _Post = new Schema({
    title : String,
    author : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    category : Schema.Types.ObjectId,
    content : String,
    viewCount : Number,
    postId : Number,
    createTime : { type: Date, default: Date.now },
    modifyTime : { type: Date, default: Date.now },
    deleted : Boolean,     // 0未删除，1已删除
    comments : [{
        user :[{ type: Schema.Types.ObjectId, ref: 'User' }],
        content : String,
        commentTime : { type: Date, default: Date.now },
        deleted : Boolean     // 0未删除，1已删除
    }]
});

var PostModel = mongoose.model('Post', _Post);

exports.findOnePost = function(postId,callback){

    PostModel.findOne({"postId" : postId})
        .populate('author')
        .exec(function (err, data) {
            if(err) {
                callback(err);
            }else{
                callback(null, data);
            }
    });
};
