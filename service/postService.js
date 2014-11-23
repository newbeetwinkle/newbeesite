var postDao = require('../dao/postDao');
var commentDao = require('../dao/commentDao');


/* Query one post info */
exports.queryOnePost = function(postId,callback){
	postDao.findOnePost(postId,callback);
};

exports.queryAllPost = function(callback){
	postDao.findAllPost(callback);
};

exports.queryPostByContent = function(searchPost, index, count, callback){
    postDao.findPostByContent(searchPost, index, count, callback);
};


exports.queryUserPost = function(user_id, callback){
    postDao.findUserPost(user_id, callback);
}

exports.saveComment = function(postId, postContent, user, callback){
    commentDao.addComment(postId, postContent, user, function(err, comment, user){
        if(err) {
            callback(err);
        }else {
            postDao.incCommentCount(postId, function(er,ok){
                if(err) {
                    callback(er);
                }else {
                    postDao.getCommentsCount(postId, function(err, doc){
                        callback(null, comment, user, doc[0].commentCount);
                    });
                }
            })
        }
    });
};

exports.queryComments = function(postId, index, count, callback){
    commentDao.findComments(postId, index, count, callback);
}

exports.queryHotPostList = function(callback){
    postDao.findHotPostList(callback)
}
