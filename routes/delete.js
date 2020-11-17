
var express = require('express');
var router = express.Router();

 router.delete('/delete', function(req, res){
    var db= req.db;
    var collection = db.get('plan');

 var myquery = {"_id" : "5fb3756a7c8f100f2e42b2cb"}
 collection.remove(myquery, function(err, obj){
    console.log(obj.result.n + "records(s) deleted");
    res.json(obj);
 });
 });

 module.exports = router;