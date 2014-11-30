var schedule = require('node-schedule');
var postService = require('./service/postService');


schedule.scheduleJob({hour: 2, minute: 27}, function(){
    console.log('schedule start');
    postService.updateHotScore(function(e, cb){
        if(e){
            console.log('schedule faild: ' + e);
        } else {
            console.log('schedule success');
        }
    });
});