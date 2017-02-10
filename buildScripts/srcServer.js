import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import open from 'open';

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname,  '../src/index.html'));
});

app.post('/quotes', (req,res)=>{
  console.log(req.body);
})

app.listen(port, function(err){
  if(err){
    console.log(err);
  }
  else{
    open('http://localhost:' + port);
  }
});
