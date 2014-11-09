var postDao = require('../dao/postDao');
var userDao = require('../dao/userDao');

exports.savePost = function(postTitle, postContent, userid, callback){
	var post = {
		title: postTitle,
		content : postContent,
		author: userid
	}
	postDao.addPost(post, function(err, doc){
		if(err) {
			callback(err);
		}else{
			callback(err, true);
		}
	});
}