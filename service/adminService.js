var postDao = require('../dao/postDao');
var userDao = require('../dao/userDao');

exports.savePost = function(postContent, callback){
	var post = {
		title: 'test edit post',
		content : postContent,
		author:'5457c530efd52c933ce69e4a'
	}
	postDao.addPost(post, function(err, doc){
		if(err) {
			callback(err);
		}else{
			callback(err, true);
		}
	});
}