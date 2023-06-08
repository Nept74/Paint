const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let isIdle = true;
const colorPicker = document.getElementById('color');


function getMousePosition(event) {
  let mouseX = event.offsetX * canvas.width / canvas.clientWidth | 0;
  let mouseY = event.offsetY * canvas.height / canvas.clientHeight | 0;
  return {x: mouseX, y: mouseY};
}

function drawstart(event) {
  context.beginPath();
  context.moveTo(getMousePosition(event).x, getMousePosition(event).y);
  isIdle = false;
}
function drawmove(event) {
  if (isIdle) return;
  context.lineTo(getMousePosition(event).x, getMousePosition(event).y);
  context.stroke();
}
function drawend(event) {
  if (isIdle) return;
  drawmove(event);
  isIdle = true;
}
function touchstart(event) { drawstart(event.touches[0]) }
function touchmove(event) { drawmove(event.touches[0]); event.preventDefault(); }
function touchend(event) { drawend(event.changedTouches[0]) }

canvas.addEventListener('touchstart', touchstart, false);
canvas.addEventListener('touchmove', touchmove, false);
canvas.addEventListener('touchend', touchend, false);
canvas.addEventListener('mousedown', drawstart, false);
canvas.addEventListener('mousemove', drawmove, false);
canvas.addEventListener('mouseup', drawend, false);

colorPicker.addEventListener('change', changeColor);

let currentColor = 'black'

function changeColor(event) {
  const newColor = event.target.value;
  context.strokeStyle = newColor;
  currentColor = newColor
}

canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight;

initialize();

function initialize() {
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}

function resizeCanvas() {
  canvas.style.width = document.body.clientWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  context.strokeStyle = currentColor;
}