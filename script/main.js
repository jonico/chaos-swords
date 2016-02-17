var drawingCanvas;
var draw;
var maxx = 1000;
var maxy = 800;

function test() {
	draw.beginPath();
	draw.moveTo(0,0);
	draw.lineTo(maxx,maxy);
	draw.stroke(); 
}

function main() {
	drawingCanvas = document.getElementById('canvascontainer');
	if(drawingCanvas.getContext) {
		draw = drawingCanvas.getContext('2d');
	}

	test();

}
