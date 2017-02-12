import express from 'express';
const app = express();
import bodyParser from 'body-parser';
const  MongoClient = require('mongodb').MongoClient;
import path from 'path';
import open from 'open';
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


var db;

MongoClient.connect('mongodb://nayna:nayna@ds135689.mlab.com:35689/dev', (err, database) =>{
  if(err) return console.log(err);

  db = database;
  console.log("Database connection ready");

  app.listen(port, (err) => {
      if(err){
        console.log(err);
      }
      else{
        console.log('Magic happens on port ' + port);
        open('http://localhost:' + port);
      }
    });



});




var router = express.Router();

router.use((req,res, next) => {
  console.log('something is happening.');
  next();

});

function handleError(res, reason, message, code){
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

router.get('/', (req, res)=> {

  res.json({message: 'Yahoo!!'});

  // db.collection('quotes').find().toArray((err, result) => {
  //   if(err) return console.log(err);
  //
  //   console.log(result);
  //
  //
  // });
  //res.sendFile(path.join(__dirname,  '../src/index.html'));
});

router.route('/quotes')
.post((req,res)=>{
  db.collection('quotes').save(req.body, (err, result) =>{
       if (err) handleError(res, err.message, "Failed to create new quote");
       else res.json({message:'saved to database'});
  //     res.redirect('/');
   });
})

.get((req, res)=> {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) handleError(res, err.message, "Failed to get contacts.");
    else res.status(200).json(result);
  });
});

router.route('/quotes/:id')
 .get((req,res)=>{
   db.collection('quotes').findOne({_id: new ObjectID(req.params.id)}, (err, result) => {
     if (err) handleError(res, err.message, "Failed to get contact.");
     else res.status(200).json(result);
   })

 })
 .put((req,res)=>{
   var body = req.body;
   delete body._id;
   db.collection('quotes').updateOne({_id: new ObjectID(req.params.id)},body, (err,result) =>{
     if(err) handleError(res, err.message, "Failed to update contact.");
     else res.status(200).json('The record was updated');
   })
 })
 .delete((req,res)=>{
   db.collection('quotes').deleteOne({_id: new ObjectID(req.params.id)}, (err, result)=>{
     if(err) handleError(res, err.message, "Failed to delete contact.");
     res.status(204).json('The record was deleted.');

   })

 })


app.use('/api', router);
