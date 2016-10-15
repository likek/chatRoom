/**
 * Created by likeke on 16-10-12.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use('/node_modules', express.static('node_modules'));
var rooms = [];
/*****主页******/
app.get('/room/:id', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
/*创建新的房间*/
app.post('/create', function (req, res) {
    var id = ~~(Math.random() * 1000);
    rooms.push(id);
    io.of('/room/' + id).on('connection', function (socket) {
        console.log('一个用户连接成功');
        socket.join('/room/' + id);
        socket.on('tiwen', function (mes) {
            io.of('/room/' + id).emit('tiwen', mes);
            console.log('广播' + mes);
        });
    });
    res.send({
        id: id
    })
});
/*进入指定房间*/
app.post('/goto', function (req, res) {
        var room = req.body.room;
        console.log(room);
        console.log(rooms);
        if (room < 1001 && room >= 0 && rooms.indexOf(parseInt(room)) != -1) {
            res.send({
                stat: '1'
                , text: '成功进入房间' + room
            , });
        }
        else {
            res.send({
                stat: '0'
                , text: '房间号不存在或格式不正确'
            , });
        }
    })
    /*登陆注册页面*/
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/login.html');
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});