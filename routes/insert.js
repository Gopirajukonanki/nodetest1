
var express = require('express');
var router = express.Router();

 router.post('/insert', function(req, res){
    var db= req.db;
    var collection = db.get('plan');
    // var obj = {"name": "Hyderabad", "place": "hyd"}
    var obj = [
      { name: "Mahesh Sharma", age: "25", address: "Ghaziabad"},  
      { name: "Tom Moody", age: "31", address: "CA"},  
      { name: "Zahira Wasim", age: "19", address: "Islamabad"},  
      { name: "Juck Ross", age: "45", address: "London"}  
    ]
    collection.insert(obj, function(e, docs){
      res.json(docs);
      console.log("Number of records inserted: " + res.insertedCount);  
    })
  });
 
  router.post('/newdata', function(req, res){
    var db= req.db;
    var collection = db.get('plan');
    // var obj = {"name": "Hyderabad", "place": "hyd"}
    
    // var obj = { name: req.body.name, age: req.body.age};
    console.log("finding existing entries with name"+ req.body.name);

     collection.find({"name": req.body.name}, function(e, result){
     console.log("result " + JSON.stringify(result));


      // if( result != null && result.length > 0) {
      //   console.log("Entry already found");
      //   res.json({"message":"Entry already found"})
      // } else {
      //   collection.insert(obj, function(e, docs){
      //     res.json(docs);
      //   });
      // }



      //delete data

      // if( result != null && result.length > 0) {
      //   collection.remove ({"name":req.body.name}, function(e, docs){
      //     res.json(docs);
      //   });
      // } else {
      //   console.log("Entry not found");
      //   res.json({"message":"Entry not found"})
      // }

      if(result != null && result.length > 0){
      var querry = {name: req.body.name };
      var updateQuery = {$set: { "job": req.body.job, "address":req.body.address }};
      collection.update(querry, updateQuery, function (err, result){
          console.log(result);
          res.json(result);
      })
    }else{
      console.log("data not updated");
      res.json({"message": "data not updated"});
    }
    });
  });
 

  










  module.exports = router;