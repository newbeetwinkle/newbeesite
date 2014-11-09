var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
mongoose.connect('mongodb://localhost/nb_blog', { server: { poolSize: 4 }});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error;'));
db.once('open',function(){
});

autoIncrement.initialize(db);
