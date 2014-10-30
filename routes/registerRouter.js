var express = require('express');
var router = express.Router();

/* register new user. */
router.get('', function(req, res) {
  res.render('register');
});

router.post('',function(req,res) {
   console.info("post!!");
   res.render('login');
});

module.exports = router;
