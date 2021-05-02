// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const port = process.env.PORT || 3005 ;
//
// server.listen(port, () => { console.log(`Listening on port ${port}`) });
//
// io.on('connection', socket => {
//     console.log("연결된 socketID : ", socket.id);
//     io.to(socket.id).emit('my socket id',{socketId: socket.id});
//
//     socket.on('enter chatroom', () => {
//         console.log("누군가가 입장함");
//         socket.broadcast.emit('receive chat', {type: "alert", chat: "누군가가 입장하였습니다.", regDate: Date.now()});
//     })
//
//     socket.on('send chat', data => {
//         console.log(`${socket.id} : ${data.chat}`);
//         io.emit('receive chat', data);
//     })
//
//     socket.on('leave chatroom', data => {
//         console.log('leave chatroom ', data);
//         socket.broadcast.emit('receive chat', {type: "alert", chat: "누군가가 퇴장하였습니다.", regDate: Date.now()});
//     })
//
// })

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// localhost 포트 설정
const port = 4002;

const app = express();

// server instance
const server = http.createServer(app);

// socketio 생성후 서버 인스턴스 사용
const io = socketIO(server);

// socketio 문법
io.on('connection', socket => {
	socket.on('send message', (item) => {
		const msg = item.name + ' : ' + item.message;
		console.log(msg);
		io.emit('receive message', {name:item.name, message:item.message});
	});
    socket.on('disconnect', function () {
		console.log('user disconnected: ', socket.id);
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`))