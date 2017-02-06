var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var sampleData = require('./data/sampledata');

var data = require('./models/detail.model.js');
var user = require('./models/user.model');

var app = express();
var port = process.env.PORT || 3001;
var db = 'mongodb://localhost/questions2DB';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect(db);

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/public/index.html');
});

app.get('/user/check/:qid', function (req, res) {

    console.log(req.params.qid);

    user.find({
        id : req.params.qid
    })
        .exec(function (err, ids) {
            if(err) {
                res.send('error occured')
            } else {
                console.log(ids);
                res.send(ids);
            }
        })

});



app.get('/users/:id', function (req, res) {

    // console.log(req.params.id);
    // console.log(sampleData[0][1].First.Question);

    var i = req.params.id;

    data.find({
        id: req.params.id
    })
        .exec(function(err, details) {
            if(err) {
                res.send('error occured')
            } else {
                console.log(details);
                res.send(details);
            }
        });

    // console.log(sampleData[i-1][1][0].Question);
    // res.send(sampleData[i-1]);
});

app.post('/users/later', function (req, res) {

    console.log(req.body[1])

    user.findOneAndUpdate({
        id: req.body[0]},
        {
            $set: {
                qid: req.body[1]}
            }, {upsert: true}, function (err) {
        if(err) throw err;
        else {
            console.log("updated");
        }
        })

});

app.listen(port, function () {
    console.log("Listening on port " + port);
});