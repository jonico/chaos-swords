var tilew = 32;
var tileh = 32;
var maxx = 12;
var maxy = 10;
var drawingCanvas;
var draw;

var bgtiles = new Image();
bgtiles.src = "../../images/tiles_bg.png";

var drawTile = new function() {
	this.stone = function(x,y) {
		draw.drawImage(bgtiles,2*tilew,0,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
	this.grass = function(x,y) {
		draw.drawImage(bgtiles,1*tilew,0,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
	this.border_l = function(x,y) {
		draw.drawImage(bgtiles,4*tilew,1*tileh,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
	this.border_ul = function(x,y) {
		draw.drawImage(bgtiles,4*tilew,0*tileh,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
	this.border_u = function(x,y) {
		draw.drawImage(bgtiles,5*tilew,0*tileh,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
	this.border_ur = function(x,y) {
		draw.drawImage(bgtiles,6*tilew,0*tileh,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
	this.border_r = function(x,y) {
		draw.drawImage(bgtiles,6*tilew,1*tileh,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
	this.border_br = function(x,y) {
		draw.drawImage(bgtiles,6*tilew,2*tileh,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
	this.border_b = function(x,y) {
		draw.drawImage(bgtiles,5*tilew,2*tileh,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
	this.border_bl = function(x,y) {
		draw.drawImage(bgtiles,4*tilew,2*tileh,tilew,tileh,x*tilew,y*tileh,tilew,tileh);
	};
}


	
function compose_background()
{
	drawTile.border_ul(0,0);
	drawTile.border_ur(maxx,0);
	drawTile.border_bl(0,maxy);
	drawTile.border_br(maxx,maxy);
	for (x=1;x<maxx;x++)
	{
		drawTile.border_u(x,0);
		drawTile.border_b(x,maxy);
	}
	for (y=1;y<maxy;y++)
	{
		drawTile.border_l(0,y);
		drawTile.border_r(maxx,y);
	}
	for (x=1;x<maxx;x++)
	{
	  for (y=1; y<maxy; y++)
	  {
		if (isOdd(x) || isOdd(y))
	    	drawTile.grass(x,y);
	    // draw.drawImage(img_grass,x*32,y*32,32,32);
	    else
	    	drawTile.stone(x,y);
	    // draw.drawImage(img_stone,x*32,y*32,32,32);
	  }	 
	}
}

function init() {
	drawingCanvas = document.getElementById('canvascontainer');
	
	if(drawingCanvas.getContext) {
		draw = drawingCanvas.getContext('2d');
	}

}