// display
const DIMX = 8 ; // 30 for 1080p
const DIMY = 8 ; // 16 for 1080p
const PIXS = 64 ;
const SEED = Date.now() ;
const bnds = ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"] ;
// environment setup
document.addEventListener('keydown', down) ;
document.addEventListener('keyup',   lift) ;
setInterval(tick, 1000 / 16) ;
var keys = [] ;

// zone 
var posx = 0 ;
var posy = 0 ;
var zsuf = "" ;
var zarr = [] ;
var cmap = "mako"
var clvl = 0 ;

// avatar attributes
var sped = 8 ;

function tick() {
	if (!clvl) {
		zpos = levl() ; 
		clvl = 1 ;
	}
	move()
	zpos = posx + "px, " + posy + "px) ; \" class=\"row\">" ;
	document.getElementById("dbug").innerHTML = "keys: " + keys ;
	document.getElementById("zone").innerHTML = zpre() + zpos + zsuf ;
	return ;
}

function down(e) {
	if ( (keys.indexOf(`${e.code}`) < 0) && (bnds.indexOf(`${e.code}`) > -1) ) {
		keys.push(`${e.code}`) ;
	}
	return ;
}

function lift(e) {
	indx = keys.indexOf(`${e.code}`) ;
	if ( indx > -1 ) {
		keys.splice(indx,1) ;
	}
	return ;
}

function move(k) {
	newx = posx ;
	newy = posy ;
	
	// check current keys
	inds = [keys.indexOf("KeyW"), keys.indexOf("KeyA"), keys.indexOf("KeyS"), keys.indexOf("KeyD")] ;
	up__ = (inds[0] > -1 && (inds[0] < inds[2] || inds[2] < 0)) ;
	left = (inds[1] > -1 && (inds[1] < inds[3] || inds[3] < 0)) ;
	down = (inds[2] > -1 && !up__) ;
	rite = (inds[3] > -1 && !left) ;
	
	// perform move
	if (up__) {
		newy += sped ;
	}
	if (left) {
		newx += sped ;
	}
	if (down) {
		newy -= sped ;
	}
	if (rite) {
		newx -= sped ;
	}
	// we could bounds check here
	posx = newx ;
	posy = newy ;
	return ;
}


function zpre() {
	xpix = DIMX * PIXS;
	ypix = DIMY * PIXS;
	ztxt =  "<div style = \"position: fixed ; filter: brightness(50%) ; font-size: 0 ; " ;
	ztxt += "width: "  + xpix + "px ; " ; 
	ztxt += "height: " + ypix + "px ; " ;
	ztxt += "transform: translate(" ;
	return ztxt ;
}

function levl() {
	// reset attributes 
	document.getElementById('audi').play() ;
	posx = -32 ;
	posy = -32 ;
	zpos = posx.toString() + "px, " + posy.toString() + "px) ; \" class=\"row\">" ;
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