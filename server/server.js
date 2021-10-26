const io = require('socket.io')(3000, {
    cors:{
        origin: ["http://localhost:8080", "https://admin.socket.io"],
    },
})

io.on('connection', socket => {
    socket.on('join-wb-room', (room, cb)=>{
        socket.join(room);
        cb(`Welcome to ${room}`);
    });

    socket.on('userDrawing', (data, room)=>{
        console.log(data);
        socket.to(room).emit('drawing', data);
    })
})
