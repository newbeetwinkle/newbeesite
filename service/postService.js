var postDao = require('../dao/postDao');

/* Query one post info */
exports.queryOnePost = function(postId,callback){
	postDao.findOnePost(postId,callback);
};


