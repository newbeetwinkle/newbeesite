/**
 * Created by MacBookAir on 10/28/14.
 */
var moment = require('moment');
var crypto = require('crypto');

exports.timestamp2Date = function(timestamp){
    return new moment(timestamp);
};

exports.date2Timestamp = function(date){
    return new moment(date).valueOf();
};

exports.dateFormat = function (date) {
    return moment(date).format('YYYY年MM月DD日 hh:mm:ss');
}

/**
 * MD5加密
 * @param data
 * @returns {*}
 */
exports.md5 = function(data) {
    return crypto.createHash('md5').update(data).digest('hex').toLowerCase();
}

exports.checkLogin =  function(req,res,next){
	if (!req.session.user) {
		req.flash("error","游客请登录！");
		return res.redirect('/users/login');
	} 
	next();
}

exports.checkNotLogin = function(req,res,next){
	if (req.session.user) {
		req.flash("error","用户"+req.session.user.username+"已登录！");
		return res.redirect('/');
	} 
	next();
}
