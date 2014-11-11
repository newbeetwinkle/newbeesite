/**
 * Created by MacBookAir on 10/28/14.
 */
var moment = require('moment');
var crypto = require('crypto');
var Busboy = require('busboy');
var fs = require('fs');
var fse = require('fs-extra');
var os = require('os');
var path = require('path');

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


exports.removeHTMLTag = function(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
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
exports.ueditor = function(static_url, handel) {
  return function(req, res, next) {
    var _respond = respond(static_url, handel);
    _respond(req, res, next);
  };
};
var respond = function(static_url, callback) {
  return function(req, res, next) {
    if (req.query.action === 'config') {
      callback(req, res, next);
      return;
    } else if (req.query.action === 'listimage') {
      res.ue_list = function(list_dir) {
        var str = '';
        var i = 0;
        var list = [];
        fs.readdir(static_url + list_dir, function(err, files) {
          if (err) throw err;

          var total = files.length;
          files.forEach(function(file) {

            var filetype = 'jpg,png,gif,ico,bmp';
            var tmplist = file.split('.');
            var _filetype = tmplist[tmplist.length - 1];
            if (filetype.indexOf(_filetype.toLowerCase()) >= 0) {
              var temp = {};
              if (list_dir === '/') {
                temp.url = list_dir + file;
              } else {
                temp.url = list_dir + "/" + file;
              }
              list[i] = (temp);
            } else {}
            i++;
            // send file name string when all files was processed
            if (i === total) {
              res.json({
                "state": "SUCCESS",
                "list": list,
                "start": 1,
                "total": total
              });
            }
          });
        });
      };
      callback(req, res, next);

    } else if (req.query.action === 'uploadimage') {

      var busboy = new Busboy({
        headers: req.headers
      });

      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        req.ueditor = {};
        req.ueditor.fieldname = fieldname;
        req.ueditor.file = file;
        req.ueditor.filename = filename;
        req.ueditor.encoding = encoding;
        req.ueditor.mimetype = mimetype;

        res.ue_up = function(img_url) {
          var dir = static_url + img_url;
          var tmpdir = path.join(os.tmpDir(), path.basename(filename));
          file.pipe(fs.createWriteStream(tmpdir));
          fse.move(tmpdir, static_url + img_url, function(err) {
            if (err) throw err;
            res.json({
              'url': img_url,
              'title': req.body.pictitle,
              'original': filename,
              'state': 'SUCCESS'
            });
          });
        };
        callback(req, res, next);
      });
      req.pipe(busboy);
    } else {
      callback(req, res, next);
    }
    return;
  };
};
