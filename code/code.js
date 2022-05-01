// display
const DIMX = 30 ;
const DIMY = 16 ;
const PIXS = 64 ;
const SEED = Date.now()
// environment setup
document.addEventListener('keydown', logKey) ;

// zone 
var posx = 0 ;
var posy = 0 ;
var zsuf = "" ;
var zarr = [] ;
var cmap = "mako"
var clvl = 0 ;

// avatar attributes
var sped = 8 ;

function logKey(e) {
	if (!clvl) {
		zpos = levl() ; 
		clvl = 1 ;
	} else {
		move(`${e.code}` ) ;
		zpos = posx + "px, " + posy + "px) ; \" class=\"row\">" ;
	}
	document.getElementById("dbug").innerHTML = posx + " " + posy ;
	document.getElementById("zone").innerHTML = zpre() + zpos + zsuf ;
}

function move(k) {
	newx = posx ;
	newy = posy ;
	if (k == "KeyW" || k == "ArrowUp") {
		newy += sped ;
	}
	if (k == "KeyA" || k == "ArrowLeft") {
		newx += sped ;
	}
	if (k == "KeyS" || k == "ArrowDown") {
		newy -= sped ;
	}
	if (k == "KeyD" || k == "ArrowRight") {
		newx -= sped ;
	}
	// we could bounds check here
	posx = newx ;
	posy = newy ;
}


function zpre() {
	xpix = DIMX * PIXS;
	ypix = DIMY * PIXS;
	ztxt =  "<div style = \"position: fixed ; filter: brightness(50%) ; font-size: 0 ; " ;
	ztxt += "width: "  + xpix + "px ; " ; 
	ztxt += "height: " + ypix + "px ; " ;
	ztxt += "transform: translate(-32px,-32px) translate(" ;
	return ztxt ;
}

function levl() {
	// reset attributes 
	document.getElementById('audi').play() ;
	posx = 0 ;
	posy = 0 ;
	zpos = posx.toString() + "px, -" + posy.toString() + "px) ; \" class=\"row\">" ;
	// build zone array
	
	
	
	// build zone string
	zsuf = "" ;
	for (var i = 0 ; i < DIMY ; i++) {
		zsuf += "<div class=\"column\">" ;
		for (var j = 0 ; j < DIMX ; j++) {
			zsuf += "<img src=\"arts/visu/"
			if (i % 3 && j % 3) {
				zsuf += "empt.png\"> "
			} else {
				zsuf += cmap ; 
				zsuf += "/tile.png\"> " ;
			}
		}
		zsuf +=  "</div>" ;
	}
	zsuf += "</div>" ;
	document.getElementById("bkgd").innerHTML = "<img class=\"rotate\" src=\"arts/visu/" + cmap + "/tile.png\">"
	document.getElementById("plyr").innerHTML = "<img style=\"border-radius: 50%;\" src=\"arts/visu/" + cmap + "/plyr.gif\">"
	return zpos ;
}