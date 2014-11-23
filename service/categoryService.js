var categoryDao = require('../dao/categoryDao');

exports.addCategory = function(categoryName, callback){
	categoryDao.insertCategory(categoryName, callback);
};

exports.queryAllCategory = function(callback){
	categoryDao.queryAllCategory(callback);
};