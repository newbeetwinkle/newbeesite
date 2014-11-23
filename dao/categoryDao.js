var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Category schema
var _Category = new Schema({
    categoryName : String,
    createTime : { type: Date, default: Date.now },
    deleted : { type: Boolean, default: false }  // 0未删除，1已删除
});

var CategoryModel = mongoose.model('Category', _Category);

exports.insertCategory = function(categoryName, callback){
	var category = new CategoryModel({
		categoryName: categoryName
	    });
	category.save(function(err){
		callback(err);
	});
};

exports.queryAllCategory = function(callback){
	CategoryModel.find({"deleted":false},function(e, users){
		if(e) {
			callback(e);
		}else{
			callback(null,users);
		}
	});
};