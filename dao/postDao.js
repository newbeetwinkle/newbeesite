var mongoose = require('mongoose');
var dateUtil = require('../dateUtil');
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

exports.findOnePost = function(postTimeId,callback){
    PostModel.findOne({"createTime" : dateUtil.timestamp2Date(postTimeId)}, function(e, doc){
        if(e) {
            callback(e);
        }else{
            callback(null, doc);
        }
    });
};
