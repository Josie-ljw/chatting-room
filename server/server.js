var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var opn = require('opn');
var path = require('path');
var bodyParser = require('body-parser');
var users = [];
var userSockets = {};
var roomMembers = [];
var leaveMsg = {};
var QiQiuYun = require('qiqiuyun-sdk');


io.on('connection', function(socket) {
    // socket.emit('chat', data);//发给自己
    // socket.broadcast.emit('chat', data);//除了自己
    // socket.emit('userList', user);

  var username = '';
  socket.on('user join', (data) => {
    username = data.user;
    if (username && users.indexOf(username) == '-1') {
      users.push(username);
      userSockets[username] = socket;
      data.users = users;
      // data.msg = "欢迎 " + data.user + " 进入聊天室";
      io.sockets.emit('sendmsg', data);
      // console.log(users)
    }
  });

  // 群发
  socket.on('sayall', function(data) {
    io.sockets.emit('hallchat', data);//群发消息
  });

  //exit
  socket.on('leave', function() {
      // console.log('1111');
      socket.emit('disconnect');
  });
  socket.on('disconnect', function() {
    var index = users.indexOf(username);
    if (index !== -1) {
      users.splice(index, 1);
    }
    io.emit('goodbye', users);
    // console.log('亲，再聊一会儿呗~');
  });
});

var jsonParser = bodyParser.json();
app.use(jsonParser);

app.all("*", (req,res,next) => {
  res.append('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/',function(req,res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.use(express.static(path.resolve(__dirname, '../dist')));


app.post('/login', function(req, res) {
  let name = req.body.username;
  if (roomMembers[name]) {
    res.send({success: false, existed: true});
  }
  roomMembers.push(name);
  res.send({success: true, username: name});
});

app.get('/player/token', function(req, res) {
  const resNo = req.query.resNo;
  const secretKey = '';//this is a secretKey, I can show it here 233333
  const token = QiQiuYun.generateToken(resNo, secretKey);
  res.send({playerToken: token});
});

const port = '8089';
const url = 'http://127.0.0.1:8089';
server.listen(port, function() {
  console.log('Server is open on %s', url);
  opn(url);
});

