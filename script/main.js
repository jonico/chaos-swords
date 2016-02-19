var drawingCanvas;
var draw;
var tilew = 32;
var tileh = 32
var maxx = 10;
var maxy = 8;
var then;



var imgReady = false;

var imgHero = new Image();
imgHero.src = "images/hero.png";

var imgBg = new Image();
imgBg.onload = function () {
	imgReady = true;
};
imgBg.src = "images/background.png";

var hero = {
	speed: 2.5,
	x: 0.0,
	y: 8.0
};

var keysDown = {};



var reset = function () {
	hero.x = 0;
	hero.y = maxy;
}

var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		if (!isBlocked(hero.x,hero.y-1))
		{
		 hero.y -= hero.speed * modifier;
		 if (hero.y<=0) { hero.y=0; }
		}
	}
	if (40 in keysDown) { // Player holding down
		if (!isBlocked(hero.x,hero.y+1))
		{
  		 hero.y += hero.speed * modifier;
		 if (hero.y>=maxy) { hero.y=maxy; }
		}
	}
	if (37 in keysDown) { // Player holding left
		if (!isBlocked(hero.x-1,hero.y))
		{
 		 hero.x -= hero.speed * modifier;
		 if (hero.x<=0) { hero.x=0; }
		}
	}
	if (39 in keysDown) { // Player holding right
		if (!isBlocked(hero.x+1,hero.y))
		{
		 hero.x += hero.speed * modifier;
		 if (hero.x>=maxx) { hero.x=maxx; }
		}
	}
};

var render = function () {
	bg();
	draw.drawImage(imgHero,tilew*(1+hero.x), tileh*(1+hero.y));

};

function isOdd(num) { return num % 2;}
function isEven(num) { return !isOdd(num); }


function isBlocked(x,y) {
	if (isOdd(Math.round(x*10)/10) && isOdd(Math.round(y*10)/10))
		return true;
	return false;
}

function bg()
{
	draw.drawImage(imgBg,0,0);
}

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};


function init() {
	drawingCanvas = document.getElementById('canvascontainer');
	
	if(drawingCanvas.getContext) {
		draw = drawingCanvas.getContext('2d');
	}
	bg();

	then = Date.now();
	reset();
	main();

//	test();

}



addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

