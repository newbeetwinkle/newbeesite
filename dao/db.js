var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/nb_blog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error;'));
db.once('open',function(){
});