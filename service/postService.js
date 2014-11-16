var postDao = require('../dao/postDao');
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
};

exports.queryPostByContent = function(searchPost, callback){
    postDao.findPostByContent(searchPost,callback);
};

exports.saveComment = function(postId, postContent, user, callback){
    commentDao.addComment(postId, postContent, user, function(err, comment, user){
        if(err) {
            callback(err);
        }else{
            commentDao.getCommentsCount(postId, function(err, count){
                callback(null, comment, user, count);
            });
        }
    });
};

exports.queryComments = function(postId, index, count, callback){
    commentDao.findComments(postId, index, count, callback);
}
