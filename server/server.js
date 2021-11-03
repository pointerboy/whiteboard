const io = require('socket.io')(3000, {
    cors: {
        origin: '*',
    },
})

var takenRooms = [];

io.on('connection', socket => {
    socket.on('join-wb-room', (room, nickname, cb) => {
        if (takenRooms.includes(room)) {
            cb(`Welcome to ${room}`);
        } else {
            cb(`Created room ${room}`);
            takenRooms.push(room);
        }

        socket.room = room;
        socket.join(room);
    });

    socket.on('disconnection', function(){
        socket.emit('disconnected');
    });

    socket.on('clearBoard', (room) =>{
        socket.to(room).emit('clear');
    });

    socket.on('userDrawing', (data, room) => {
        socket.to(room).emit('drawing', data);
    });
});

