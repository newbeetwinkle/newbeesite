var express = require('express');
var router = express.Router();
var postService = require('../service/postService');

/* GET one post info. */
router.get('/detail/:postTimeId', function(req, res) {
  postService.queryOnePost(req.params.postTimeId,function(e, date){
  	res.send("register " + req.params.postTimeId + " sueccess!");
  });
});

/* GET one post info. */
router.get('/postFake/:title', function(req, res) {
    postService.postFake(req.params.title,function(e, date){
        res.send("register " + req.params.title + " sueccess!");
    });
});

/* GET one post info. */
router.get('/addCategory/:name', function(req, res) {
    postService.postFake(req.params.title,function(e, date){
        res.send("register " + req.params.title + " sueccess!");
    });
});


module.exports = router;
