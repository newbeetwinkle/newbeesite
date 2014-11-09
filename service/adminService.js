var postDao = require('../dao/postDao');
var userDao = require('../dao/userDao');

exports.savePost = function(postContent, userid, callback){
	var post = {
		title: 'test edit post',
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

exports.showUsers = function(callback){
	userDao.findAllUser(function(err,data){
		if (err) {
			callback(err);
		} else {
			callback(err,data);
		}
	});
}