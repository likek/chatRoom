/**
 * Created by likeke on 16-10-12.
 */
var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.use('/node_modules',express.static('node_modules'));

app.get('/',function (req, res) {
    res.sendFile(__dirname+'/index.html');
});

io.on('connection',function (socket) {
    console.log('一个用户连接成功');
    socket.on('tiwen',function (mes) {
        console.log('得到了:'+mes);
        //广播
        io.emit('tiwen',mes);
    });
});

http.listen(3000,function () {
    console.log('listening on *:3000');
});