var postDao = require('../dao/postDao');
var userDao = require('../dao/userDao');


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
            postDao.addComment(postId, postContent, doc, callback);
        }
    });
}