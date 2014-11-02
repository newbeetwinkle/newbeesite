var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Category schema
var _Category = new Schema({
    categoryName : String,
    createTime : { type: Date, default: Date.now },
    deleted : Boolean  // 0未删除，1已删除
});