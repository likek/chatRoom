/**
 * Created by likeke on 16-10-12.
 */
var http=require('http');
var fs=require('fs');
var serve=http.createServer(function (req, res) {
    if (req.url==='/'){
        fs.readFile('./index.html',function (err, data) {
            res.end(data);
        })
    }
});

var socket=require('socket.io')(serve);
socket.on('connection',function (socket) {
    console.log('一个用户连接成功');
});

serve.listen(3000,'127.0.0.1');