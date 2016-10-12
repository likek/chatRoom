/**
 * Created by likeke on 16-10-12.
 */
var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.use('/node_modules',express.static('node_modules'));

/*****主页******/
app.get('/',function (req, res) {
    response.writeHead(200, { 'Content-Type': 'text/html'});
    res.sendFile(__dirname+'/index.html');
});

/******接受客户端消息并处理*****/
io.on('connection',function (socket) {
    console.log('一个用户连接成功');
    socket.on('tiwen',function (mes) {
        //广播
        io.emit('tiwen',mes);
    });
});

http.listen(3000,function () {
    console.log('listening on *:3000');
});