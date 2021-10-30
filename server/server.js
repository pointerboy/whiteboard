const io = require('socket.io')(3000, {
    cors: {
        origin: ["http://localhost:8080", "https://admin.socket.io"],
    },
})

var takenRooms = [];

io.on('connection', socket => {
    socket.on('join-wb-room', (room, cb) => {
        if (takenRooms.includes(room)) {
            cb(`Welcome to ${room}`);
        } else {
            cb(`Created room ${room}`);
            takenRooms.push(room);
        }

        socket.room = room;
        socket.join(room);
    });

    socket.on('userDrawing', (data, room) => {
        console.log(data);
        socket.to(room).emit('drawing', data);
    });
});

