var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var react = require('react');
var reactDom = require('react-dom');
var reactRouter = require('react-router');

var nytreact = require('./models/nytreact.js');

//Express
var app = express();
var PORT = process.env.PORT || 3000;

//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

//Mongoose
mongoose.connect('mongodb://localhost/3000/nytreact');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});


app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered
app.get('/api/', function(req, res) {

  // This GET request will search for the latest clickCount
  nytreact.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post('/api/', function(req, res){
  
  var newModel = new nytreact(req.body);
  console.log(req.body);

  var modelID = req.body.ID;
  var modelSearchTerm = req.body.searchTerm;
  var modelDate = req.body.date;
  //var  = parseInt(req.body.clicks);

  // Note how this route utilizes the findOneAndUpdate function to update the clickCount.
  nytreact.findOneAndUpdate({"ID": modelID}, {$set: {"searchTerm": modelSearchTerm}}, {upsert: true}).exec(function(err){

    if(err){
      console.log(err);
    }

    else{
        res.send("Updated nytreact!");
    }
  });

});



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});