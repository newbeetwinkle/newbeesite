/**
 * Created by MacBookAir on 10/28/14.
 */
var moment = require('moment');

exports.timestamp2Date = function(timestamp){
    return new moment(timestamp);
};

exports.date2Timestamp = function(date){
    return new moment(date).valueOf();
};

