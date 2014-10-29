var postDao = require('../dao/postDao');
var userDao = require('../dao/userDao');

/* Query one post info */
exports.queryOnePost = function(postId,callback){
	postDao.findOnePost(postId,callback);
};

exports.postFake = function(title,callback){
    postDao.saveOnePost(title,callback);
};