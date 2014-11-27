var schedule = require('node-schedule');

schedule.scheduleJob({hour: 1, minute: 21}, function(){
    console.log('schedual test');
});