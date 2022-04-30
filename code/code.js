// display
const DIMX = 7 ;
const DIMY = 7 ;
const PIXS = 64 ;
const SEED = Date.now()
var zpre = "<div style = \"position: fixed ; font-size: 0 ; width: " + 2 * window.innerWidth + "px ; top: 100% ; left: 100% ; transform: translate(-" ;
var newl = 1 ;

// environment setup
document.addEventListener('keydown', logKey) ;

// zone 
var posx = 0 ;
var posy = 0 ;
var zsuf = "" ;
var zarr = [] ;

// avatar attributes
var sped = 8 ;


function logKey(e) {
	if (newl) {
		zpos = levl() ; 
		newl = 0 ;
	} else {
		move(`${e.code}` ) ;
		zpos = posx.toString() + "px, -" + posy.toString() + "px) ; \" class=\"row\">" ;
	}
	document.getElementById("zone").innerHTML = zpre + zpos + zsuf ;
	// document.getElementById("dbug").innerHTML = posx.toString() + "," + posy.toString() ;
}

function move(k) {
	newx = posx ;
	newy = posy ;
	if ((k == "KeyS" || k == "ArrowDown")  && (newy - sped) >= 0 ) {
		newy -= sped ;
	}
	if ((k == "KeyD" || k == "ArrowRight") && (newx - sped) >= 0 )  {
		newx -= sped ;
	}
	if ((k == "KeyW" || k == "ArrowUp")    && (newy + sped) <= window.innerHeight) {
		newy += sped ;
	}
	if ((k == "KeyA" || k == "ArrowLeft")  && (newx + sped) <= window.innerWidth ) {
		newx += sped ;
	}	
	posx = newx ;
	posy = newy ;
}

function levl() {
	// reset attributes 
	document.getElementById('audi').play() ;
	posx = (PIXS / 2 + window.innerWidth  / 2) | 0 ;
	posy = (PIXS / 2 + window.innerHeight / 2) | 0 ;
	zpos = posx.toString() + "px, -" + posy.toString() + "px) ; \" class=\"row\">" ;
	// build zone array
	
	// build zone string
	zsuf = ""
	for (var i = 0 ; i < DIMX ; i++) {
		zsuf += "<div class=\"column\">" ;
		for (var j = 0 ; j < DIMY ; j++) {
			zsuf += "<img style=\"transform: rotate(" ;
			zsuf += ((SEED % 47 + 9 * i + 5 * j) % 4 * 90).toString() ;
			zsuf += "deg);\" src=\"arts/visu/mako/tile.png\"> " ;
		}
		zsuf += "</div>" ;
	}
	zsuf += "</div>" ;
	//document.getElementById("bkgd").innerHTML = zpre + zpos + zsuf ;
	return zpos ;
}