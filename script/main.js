var drawingCanvas;
var draw;
var tilew = 32;
var tileh = 32
var maxx = 10;
var maxy = 8;
var then;
var imgReady = false;
var attackDuration = 1000;


var heroTiles = { "fighter": new Image() };
heroTiles["fighter"].src = "images/hero.png";

var imgBg = new Image();
imgBg.onload = function () {
	imgReady = true;
};
imgBg.src = "images/background.png";

function Hero(x,y,role) {
	this.speed = 2.5;
	this.dir = 0;
	this.x=x;
	this.y=y;
	this.role=role;
	this.moving = 0;
	this.lastAttack= 0;

	this.attack = function() { this.lastAttack = Date.now(); };

	this.secSinceLastAttack = function() { return Date.now() - this.lastAttack; };

	this.isAttacking = function() {
	  return this.secSinceLastAttack()<attackDuration;
	};
}

var hero = new Hero(0,maxy-1,"fighter");

var keysDown = {};


var reset = function () {
	hero.x = 0;
	hero.y = maxy-1;
}

var update = function (modifier) {
	stillmoving = 0;
	if (38 in keysDown) { // Player holding up
		if (!isBlocked(hero.x,hero.y-1))
		{
		 hero.y -= hero.speed * modifier;
		 hero.dir = 0;
		 stillmoving = 1;
		 if (hero.y<=0) { hero.y=0; }
		}
	}
	if (40 in keysDown) { // Player holding down
		if (!isBlocked(hero.x,hero.y+1))
		{
  		 hero.y += hero.speed * modifier;
		 hero.dir = 2;
		 stillmoving = 1;
		 if (hero.y>=maxy) { hero.y=maxy; }
		}
	}
	if (37 in keysDown) { // Player holding left
		if (!isBlocked(hero.x-1,hero.y))
		{
 		 hero.x -= hero.speed * modifier;
		 hero.dir = 3;
		 stillmoving = 1;
		 if (hero.x<=0) { hero.x=0; }
		}
	}
	if (39 in keysDown) { // Player holding right
		if (!isBlocked(hero.x+1,hero.y))
		{
		 hero.x += hero.speed * modifier;
		 hero.dir = 1;
		 stillmoving = 1;
		 if (hero.x>=maxx) { hero.x=maxx; }
		}
	}
	if (32 in keysDown) { // Player attacking
		if (!hero.isAttacking())
		{
		  hero.attack();	
		}	
	}
	if (stillmoving) 
	 hero.moving+=modifier*5;
	else
	 hero.moving=0;
};

var fullscreen = function() {
	if (drawingCanvas.requestFullscreen) {
		drawingCanvas.requestFullscreen();
	} else if (drawingCanvas.webkitRequestFullscreen) {
		drawingCanvas.webkitRequestFullscreen();
	} else if (drawingCanvas.mozRequestFullScreen) {
		drawingCanvas.mozRequestFullScreen();
	} else if (drawingCanvas.msRequestFullscreen) {
		drawingCanvas.msRequestFullscreen();
	}
}

var render = function () {
	bg();
	movstate = Math.floor(hero.moving) % 4;
	if (isEven(movstate)) anim=0
	else anim=((movstate-1)/2)+1; 
	if (hero.secSinceLastAttack()<500)
	{
	  draw.drawImage(heroTiles[hero.role],3*hero.dir*tilew,tileh,3*tilew,3*tileh,tilew*(1+hero.x)-tilew, tileh*(1+hero.y)-tileh,tilew*3,tileh*3);
	} else {
	  draw.drawImage(heroTiles[hero.role],3*hero.dir*32+32*anim,0,32,32,tilew*(1+hero.x), tileh*(1+hero.y),32,32);
	}
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

