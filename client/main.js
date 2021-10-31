import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('connect', () => {
    console.log(`Connected with id: ${socket.id}`);
});

const joinWhiteboardRoomBtn = document.getElementById
    ("room-submit");
const joinRoomInput = document.getElementById
    ("room-input");

joinWhiteboardRoomBtn.addEventListener("click", () => {
    const room = joinRoomInput.value;

    if(room === '') return;

    socket.emit('join-wb-room', room, message => {
        setJoinMessageToUser(message);
    })
})

var colors = document.getElementsByClassName("color");

for(var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
}

function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
}

function setJoinMessageToUser(msg) {
    const elem = document.createElement("h2");
    elem.textContent = msg;
    document.getElementById("welcome-room").append(elem);
}

var canvas = document.getElementsByClassName('whiteboard')[0];
var context = canvas.getContext('2d');

var current = {
    color: 'black'
};

var drawing = false;

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mouseout', onMouseUp, false);
canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

socket.on('drawing', data => {
    onDrawingEvent(data);
});

window.addEventListener('resize', onResize, false);
onResize();

function drawLine(x0, y0, x1, y1, color, emit) {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);

    context.strokeStyle = color;
    context.lineWidth = 2;

    context.stroke();
    context.closePath();

    if (!emit) return;
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('userDrawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
    }, joinRoomInput.value);
}

function onMouseDown(e) {
    drawing = true;

    current.x = e.clientX;
    current.y = e.clientY;
}

function onMouseUp(e) {
    if (!drawing) return;
    drawing = false;
    drawLine(current.x, current.y,
        e.clientX, e.clientY, current.color, true);

    current.x = e.clientX;
    current.y = e.clientY;
}


function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function () {
        var time = new Date().getTime();
        if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
        }
    };
}

function onMouseMove(e) {
    if (!drawing) { return; }

    drawLine(current.x,
        current.y,
        e.clientX,
        e.clientY,
        current.color,
        true);

    current.x = e.clientX;
    current.y = e.clientY;
}

function onDrawingEvent(data) {
    var w = canvas.width;
    var h = canvas.height;

    drawLine(data.x0 * w,
        data.y0 * h,
        data.x1 * w,
        data.y1 * h,
        data.color);
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
