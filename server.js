var express = require('express');
var mongoose = require('mongoose');
var mongodb = require("mongodb");
const pg = require('pg');
var ObjectID = mongodb.ObjectID;
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
const route = require('./routes/route');



var db;


var port = process.env.port || 8080;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)

/*
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/local", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});
*/

// mongoose.connection.on('connected',()=>{
//     console.log('Connected to MongoDB at port 27017')
// });

// mongoose.connection.on('error',(err)=>{
//     console.log(err)
// });

// mongoose.connect('mongodb://localhost:27017/local');

// function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('success');
//     }
// }); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({limit: "50mb", type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:5000000}));
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public'));


// app.get('*', (req, res)=>{
//     res.sendfile('./public/views/index.html');
// });

app.use('/api', route);





// require('./routes/route')(app);

app.listen(port);
console.log('Magic happens on port ' + port);

//exports = module.exports = app;

module.exports = app;