// app/routes.js

// var db = require('../config/db.js');
// var url = 'mongodb://localhost:27017/';
// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect(url, function(err,db){

// });


var express = require('express');
var router = express.Router();
const pg = require('pg')
var connectionString = "postgres://mlervdnnzjgysf:175ad3c43ad407bd0e0d18f8fc49da1d4466163f60394d518590a50eb3c36289@ec2-75-101-142-91.compute-1.amazonaws.com:5432/d43ehnoshe1rb0?ssl=true"
var client = new pg.Client(connectionString);
client.connect();
var Users = require('../app/models/users');
var Image = require('../app/models/images');
var Notifications = require('../app/models/notifications');
var db = require('../queries');
var ObjectId = require('mongodb').ObjectID;

// router.get('*', (req, res)=>{
//     res.sendfile('./public/views/index.html');
// });

// router.get('/users', (req, res, next)=>{
//    res.send('routetested');
// });

router.get('/users', db.getUsers);

router.get('/users', function(req, res) {
            // use mongoose to get all users in the database
            Users.find(function(err, users) {
                if (err) {
                    res.send(err);
                }
                else{
                    res.json(users); // return all users in JSON format
                }
                
            });
        });

router.get('/notifications', function(req, res){
    Notifications.find(function(err, users){
        if(err){
            res.send(err);
        }
        else{
            res.json(users);
        }
    })
})

router.post('/user', (req, res)=>{
    let newUser = new Users({
        "userName": req.body.hello
    });
    newUser.save((err, newUser)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json({msg: 'Item has been added successfully'});
        }
    })
});

// router.post('/image', function(req, res, err) {
//     let newImage = req.body
//     console.log("hello");
//     if(err) {
//         res.send(err);
//     }
//     else res.send("hello")
// });

router.patch('/image/:id', (req, res)=> {
    var updateUser = req.body;
    var id = req.params.id;
    router.update({_id: ObjectId(id)}, {$set: updateUser})
});

router.put('/image/:id', (req, res, next) => {
    Users.findOneAndUpdate({_id : req.params.id}, {
        $set:{
            userName: req.body.userName,
            image: [{
                imageURL: req.body.image
            }]
        }
    },
    function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
})

router.put('/images/:id', (req, res, next) => {
    Users.findByIdAndUpdate({_id : req.params.id}, {
        $push:{
            image: {
                imageURL: req.body.image
            }
        }
    },
    function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
})

router.get('/images/:id', function(req, res){
    Users.findOne({'image._id' : req.params.id}, {'image.$':1},
        function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.json(result);
        }
    })
})


//  router.get('/users', (req, res, next)=>{
//  });

//  router.get('/users', (req, res, next)=>{
//  });

module.exports = router;

    // module.exports = function(app) {

    //     // server routes ===========================================================
    //     // handle things like api calls
    //     // authentication routes

    //     // sample api route
    //     app.get('/users', function(req, res) {
    //         // use mongoose to get all users in the database
    //         Users.find(function(err, users) {
    //             if (err) {
    //                 res.send(err);
    //             }
    //             else{
    //                 res.json(users); // return all users in JSON format
    //             }
                
    //         });
    //     });

    //     app.post("/user", function(req, res) {
    //         let newUser = new Users({
    //             userName: req.body.userName
    //         })
    //     });
        
    //     /*  "/api/contacts/:id"
    //      *    GET: find contact by id
    //      *    PUT: update contact by id
    //      *    DELETE: deletes contact by id
    //      */
        
    //     app.get("/user/:id", function(req, res) {
    //     });
        
    //     app.put("/user/:id", function(req, res) {
    //     });
        
    //     app.delete("/user/:id", function(req, res) {
    //     });

    //     // route to handle creating goes here (app.post)
    //     // route to handle delete goes here (app.delete)

    //     // frontend routes =========================================================
    //     // route to handle all angular requests
    //     app.get('*', function(req, res) {
    //         res.sendfile('./public/views/index.html'); // load our public/index.html file
    //     });