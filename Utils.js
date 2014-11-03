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

/**
 * MD5加密
 * @param data
 * @returns {*}
 */
exports.md5 = function(data) {
    return crypto.createHash('md5').update(data).digest('hex').toLowerCase();
}
