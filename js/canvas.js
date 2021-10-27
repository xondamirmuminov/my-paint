const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 200;

const ctx = canvas.getContext('2d');
let startBgColor = "white";
ctx.fillStyle = startBgColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;
let drawColor = "black";
let drawWidth = "20";

let restoreArr = [];
let index = -1;

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', finish);
canvas.addEventListener('mousemove', draw);

function start(e) {
    isDrawing = true;
    draw(e);
};

function finish(e) {
    isDrawing = false;
    ctx.stroke();
    ctx.beginPath();

    if (e.type != 'mouseout') {
        restoreArr.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    };
};

function draw(e) {
    if (!isDrawing) return;
    ctx.lineWidth = drawWidth;
    ctx.strokeStyle = drawColor;
    ctx.lineCap = "round";

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
};

function changeBg(e) {
    drawColor = e.style.background;
};

function clearCanvas() {
    ctx.fillStyle = startBgColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    restoreArr = [];
    index = -1;
};

function undoDraw() {
    if (index <= 0) {
        clearCanvas();
    } else {
        index -= 1;
        restoreArr.pop(ctx.putImageData(restoreArr[index], 0, 0));
    }; s
};