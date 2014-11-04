var postDao = require('../dao/postDao');
var userDao = require('../dao/userDao');
var commentDao = require('../dao/commentDao');


/* Query one post info */
exports.queryOnePost = function(postId,callback){
	postDao.findOnePost(postId,function(err, post){
        if(err) {
            callback(err);
        }else{
            commentDao.getCommentsCount(postId, function(err, count){
                post['commentsCount'] = count;
                callback(null, post);
            });
        }
    });
};

exports.queryAllPost = function(callback){
	postDao.findAllPost(callback);
}

exports.saveComment = function(postId, postContent, user, callback){
        commentDao.addComment(postId, postContent, user, callback);
};

exports.queryComments = function(postId, index, count, callback){
    commentDao.findComments(postId, index, count, callback);
}
