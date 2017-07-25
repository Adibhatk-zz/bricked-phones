var express = require('express');
var app = express();
var path = require('path');
var root = process.cwd();


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+ '/home.html'));
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

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});