const io = require('socket.io')(3000, {
    cors:{
        origin: ["http://localhost:8080", "https://admin.socket.io"],
    },
})

io.on('connection', socket => {
    console.log(socket.id);

    socket.on('join-wb-room', (room, cb)=>{
        socket.join(room);
        cb(`Welcome to ${room}`);
    })
})
