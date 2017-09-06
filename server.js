var http = require('http');
var express = require('express');
var pathUtil = require('path');

var mysql = require('mysql');
var db = require('./database/database.js');
var connection = mysql.createConnection(db);

var bodyParser = require('body-parser');

var app = express();
// json 처리를 위해 추가
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//console.log(__dirname+'/app/photo')
// 정적 파일 제공 ( 이미지 )
app.use(express.static(__dirname));

app.post('/login', function(req, res){
  var user_id = req.body.user_id;
  var user_pwd = req.body.user_pwd;

  console.log(user_id);
  console.log(user_pwd);
});

// 카테고리에 해당되는 이미지 경로를 모두 뿌려준다.
app.post('/getProfile', function(req, res){
  var category = req.body.category;
  // console.log(category);

  //var category_Query = "SELECT url FROM photo WHERE category='"+category+"'";
  var category_Query = `SELECT url FROM photo WHERE category='${category}'`;
  connection.query(category_Query, function(err, rows) {
    if(err){
      console.error(err);
      throw err;
    }
    var objs = [];
    for(var i=0; i<rows.length; i++){
      objs.push({"url" : rows[i].url});
    }

    var result = JSON.stringify(rows);
    res.send(result);
  });
});

// // 사진 경로를 받아서 뿌려준다.
// app.post('/photo', function(req, res){
//    var photo = req.body.photo;
//
//    res.sendFile(__dirname + photo);
// });

// app.get('/photo', function(req, res){
//   var photo = req.header.photo;
//   res.sendFile(__dirname + photo);
// });

var server = app.listen(8088, function(){
  console.log('server started..');
});
