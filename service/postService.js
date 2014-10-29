var postDao = require('../dao/postDao');
var userDao = require('../dao/userDao');

/* Query one post info */
exports.queryOnePost = function(postId,callback){
	postDao.findOnePost(postId,callback);
};

