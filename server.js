var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
});

app.get('/signup',function(req,res){
    res.sendFile(path.join(__dirname + '/signup.html'));
});

app.get('/review',function(req,res){
	res.sendFile(path.join(__dirname + '/review.html'));
});

app.get('/phone.jpg',function(req,res){
	res.sendFile(path.join(__dirname + '/phone.jpg'));
});

app.get('/wallpaper.jpg',function(req,res){
	res.sendFile(path.join(__dirname + '/wallpaper.jpg'));
});

app.get('/phone_review',function(req,res){
	res.sendFile(path.join(__dirname + '/phone_review.html'));
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});