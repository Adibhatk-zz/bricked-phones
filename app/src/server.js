var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/signup.html'));
});

app.get('/signup.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/signup.js'));
});

app.get('/main.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/main.js'));
});

app.get('/cookie.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/cookie.js'));
});

app.get('/home',function(req,res){
    res.sendFile(path.join(__dirname + '/home.html'));
});

app.get('/review',function(req,res){
	res.sendFile(path.join(__dirname + '/write_review.html'));
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

app.get('/hasura',function(req,res){
	res.sendFile(path.join(__dirname + '/hasura.html'));
});


app.listen(8080, function () {
    console.log('App listening on port 8080!');
});