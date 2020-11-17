var express = require('express');
var router = express.Router();

router.get('/userlist', function(req, res) {
  var db = req.db;
  console.log(db);
  var collection = db.get('plan');
  collection.find({},{},function(e, docs){
    console.log(docs);
      // res.render('userlist', {
      //     "userlist" : docs
      // });
      res.json(docs);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get hello world page

router.get('/index', function(req, res){
  res.render("index", {title: "Hello World!"})
})

router.get('/home', function(req, res){
  res.render("home", {title: "Home page"})
})

module.exports = router;

