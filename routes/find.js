var express = require('express');
var router = express.Router();

 router.get('/find', function(req, res){
    var db = req.db;
    var collection = db.get('plan');
    var querry = {address: "CA"};
    collection.find(querry, function (err, result){
        console.log(result);
        res.json(result);
    })
 })

 module.exports = router;