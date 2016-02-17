var drawingCanvas;
var draw;
var maxx = 416;
var maxy = 352;
var img_grass;
var img_stone;


function test() {
	draw.beginPath();
	draw.moveTo(0,0);
	draw.lineTo(maxx,maxy);
	draw.stroke(); 
	draw.drawImage(img_grass,100,10,32,32);
}

function isOdd(num) { return num % 2;}

function bg()
{
	for (x=0;x<=12;x++)
	{
	  for (y=0; y<=10; y++)
	  {
	    if (x<1 || y<1 || x>11  || y>9)
	    draw.drawImage(img_stone,x*32,y*32,32,32);
	    else if (isOdd(x) || isOdd(y))
	    draw.drawImage(img_grass,x*32,y*32,32,32);
	    else
	    draw.drawImage(img_stone,x*32,y*32,32,32);
	  }	 
	}
}

function main() {
	drawingCanvas = document.getElementById('canvascontainer');
	img_grass = document.getElementById('grass');
	img_stone = document.getElementById('stone');
	
	if(drawingCanvas.getContext) {
		draw = drawingCanvas.getContext('2d');
	}
	bg();
//	test();

}
