var postDao = require('../dao/postDao');
var userDao = require('../dao/userDao');
var commentDao = require('../dao/commentDao');

exports.savePost = function(act, post, callback){
    if(act == "new") {
        // new post
        postDao.addPost(post, function(err, doc){
            if(err) {
                callback(err);
            }else{
                callback(err, true);
            }
        });
    } else {
        // modify post
        postDao.modifyPost(post, function(err, doc){
            if(err) {
                callback(err);
            }else{
                callback(err, true);
            }
        });
    }
}

exports.deletePost = function(postId, callback){
    postDao.deletePost(postId, function(err, doc){
        if(err) {
            callback(err);
        }else{
            commentDao.deleteAllComments(postId, function(err, cb){
                if(err) {
                    callback(err);
                }else{
                    callback(err, true);
                }
            });
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