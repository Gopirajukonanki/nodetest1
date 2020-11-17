var express = require('express');
var router = express.Router();

 router.post('/update', function(req, res){
    var db = req.db;
    var collection = db.get('plan');
    var querry = {address: "CA"};
    var updateQuery = {$set: { job: "Software", address: "AUS" }};
    collection.update(querry, updateQuery, function (err, result){
        console.log(result);
        res.json(result);
    })
 })

 module.exports = router;