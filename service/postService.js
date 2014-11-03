var postDao = require('../dao/postDao');
var userDao = require('../dao/userDao');
var commentDao = require('../dao/commentDao');


/* Query one post info */
exports.queryOnePost = function(postId,callback){
	postDao.findOnePost(postId,callback);
};

exports.queryAllPost = function(callback){
	postDao.findAllPost(callback);
}

exports.saveComment = function(postId, postContent, callback){
    userDao.findOneUser("FrankSu",function(err, doc){
        if(err) {
            callback(err);
        }else{
            commentDao.addComment(postId, postContent, doc, callback);
        }
    });
}

exports.queryComments = function(postId, index, count, callback){
    commentDao.findComments(postId, index, count, callback);
}
