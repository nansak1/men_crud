import express from 'express';
const app = express();
import bodyParser from 'body-parser';
const  MongoClient = require('mongodb').MongoClient;
import path from 'path';
import open from 'open';

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
       if (err) res.send(err);
     res.json({message:'saved to database'});
  //     res.redirect('/');
   });
})

.get((req, res)=> {
  db.collection('quotes').find().toArray((err, result) => {
    if(err) res.send(err);
    res.json(result);
  });
});


app.use('/api', router);
// app.post('/quotes', (req,res)=>{
//
//   //console.log(req.body);
// });
