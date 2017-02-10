import express from 'express';
const app = express();
import bodyParser from 'body-parser';
const  MongoClient = require('mongodb').MongoClient;
import path from 'path';
import open from 'open';
const port = 3000;

var db;
MongoClient.connect('mongodb://nayna:nayna@ds135689.mlab.com:35689/dev', (err, database) =>{
  if(err){
    return console.log(err);
  }
  db= database;
  // app.listen(port, () =>{
  //   console.log('listening on '+ port);
  // });

});


app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname,  '../src/index.html'));
});

app.post('/quotes', (req,res)=>{
  db.collection('quotes').save(req.body, (err, result) =>{
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
  console.log(req.body);
});

app.listen(port, (err) => {
  if(err){
    console.log(err);
  }
  else{
    open('http://localhost:' + port);
  }
});
