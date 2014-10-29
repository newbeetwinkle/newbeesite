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
    deleted : Boolean,     // 0未删除，1已删除
    comments : [{
        user : Schema.Types.ObjectId,
        content : String,
        commentTime : { type: Date, default: Date.now },
        deleted : Boolean     // 0未删除，1已删除
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

exports.saveOnePost = function(title, callback){

    var post = new PostModel({
        title : title,
        author : new Object("5451079bf412a19949123d60"),
        content : "this is content, and very very long。",
        viewCount : 3,
        deleted : 0
    });

    post.save(function(e){
        console.log(e);
        callback();
    })
}
