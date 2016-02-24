var drawingCanvas;
var draw;
var tilew = 32;
var tileh = 32
var maxx = 10;
var maxy = 8;
var treeHp = 3;
var then;
var imgReady = false;
var attackDuration = 1000;


var heroTiles = { "fighter": new Image() };
heroTiles["fighter"].src = "images/hero.png";
var gameTiles = { "tree": new Image() };
gameTiles.tree.src = "images/tree.png";
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
	this.render = function() {
		movstate = Math.floor(this.moving) % 4;
		if (isEven(movstate)) anim=0
		else anim=((movstate-1)/2)+1; 
		if (this.secSinceLastAttack()<500)
		{
		  draw.drawImage(heroTiles[this.role],3*this.dir*tilew,tileh,3*tilew,3*tileh,tilew*(1+this.x)-tilew, tileh*(1+this.y)-tileh,tilew*3,tileh*3);
		} else {
		  draw.drawImage(heroTiles[this.role],3*this.dir*32+32*anim,0,32,32,tilew*(1+this.x), tileh*(1+this.y),32,32);
		};

	};

   this.update = function (modifier) {
	if (!this.isAttacking())
	{
		map.unset(this.x,this.y);
		stillmoving = 0;
		if (38 in keysDown) { // Player holding up
			if (!isBlocked(this.x,this.y-1))
			{
			 this.y -= this.speed * modifier;
			 this.dir = 0;
			 stillmoving = 1;
			 if (this.y<=0) { this.y=0; }
			}
		}
		if (40 in keysDown) { // Player holding down
			if (!isBlocked(this.x,this.y+1))
			{
	  		 this.y += this.speed * modifier;
			 this.dir = 2;
			 stillmoving = 1;
			 if (this.y>=maxy) { this.y=maxy; }
			}
		}
		if (37 in keysDown) { // Player holding left
			if (!isBlocked(this.x-1,this.y))
			{
	 		 this.x -= this.speed * modifier;
			 this.dir = 3;
			 stillmoving = 1;
			 if (this.x<=0) { this.x=0; }
			}
		}
		if (39 in keysDown) { // Player holding right
			if (!isBlocked(this.x+1,this.y))
			{
			 this.x += this.speed * modifier;
			 this.dir = 1;
			 stillmoving = 1;
			 if (this.x>=maxx) { this.x=maxx; }
			}
		}
		if (32 in keysDown) { // Player attacking
		  this.attack();	
		}
		if (stillmoving) 
		 this.moving+=modifier*5;
		else
		 this.moving=0;
		map.set(this.x,this.y,this);
	}
  }

}

function Tree(x,y) {
	this.x = x;
	this.y = y;
	this.hp = treeHp;
	map.set(this.x,this.y,this);

	this.render = function()
	{
	  draw.drawImage(gameTiles["tree"],0,0,32,32,tilew*(1+this.x), tileh*(1+this.y),32,32);
	};

	this.hit = function()
	{
	  this.hp--;
	  if (this.hp==0) {
	    map.unset(this.x,this.y);
	    for (var i=0; i<trees.length; i++)
	    {
	       if (trees[i]==this) trees[i] = "dead";
	    }
	  }
	};
}

function Map() {
	this.world = {};
	for (var y=-1; y<maxy+1; y++)
	{
	  this.world[y] = {};
	  for (var x=-1; x<maxx+1; x++)
	  {
	    if (isEven(x) || isEven(y))
	      this.world[y][x]="free";
	    else
              this.world[y][x]="stone";
	  }
	};

	this.set = function(x,y,to) {
		this.world[Math.round(y)][Math.round(x)] = to;
	};

	this.unset = function(x,y) {
		this.world[Math.round(y)][Math.round(x)] = "free";
	};

	this.get = function(x,y) {
		if (x<0 || y<0 || x>=maxx || y>=maxy) return "stone";
		return this.world[Math.round(y)][Math.round(x)];
	};

}

var map = new Map();
var players = [new Hero(0,maxy-1,"fighter"),new Hero(maxx-1,0,"fighter")];
var trees = [new Tree(4,4)];

var keysDown = {};


var reset = function () {
}


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
	for (var i=0;i<players.length;i++) {
		players[i].render();
	};
	for (var i=0;i<trees.length;i++) {
	  if (trees[i]!="dead")
	    trees[i].render();
	};
};

function isOdd(num) { return num % 2;}
function isEven(num) { return !isOdd(num); }


function isBlocked(x,y) {
	if (isOdd(Math.round(x*10)/10) && isOdd(Math.round(y*10)/10))
		return true;
	if (map.get(x,y)=="free") return false;
	return true;
}

function bg()
{
	draw.drawImage(imgBg,0,0);
}

var main = function () {
	var now = Date.now();
	var delta = now - then;

	for (var i=0;i<players.length;i++)
		players[i].update(delta / 1000);
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

