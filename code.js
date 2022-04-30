
	// display
	const DIMX = 7 ;
	const DIMY = 7 ;
	const PIXS = 64 ;
	var zpre = "<div style = \"position: fixed ; font-size: 0 ; width: " + 2 * window.innerWidth + "px ; top: 100% ; left: 100% ; transform: translate(-" ;
	var newl = 1 ;
	document.addEventListener('keydown', logKey) ;
	// zone 
	var posx = 0 ;
	var posy = 0 ;
	var zsuf = "" ;
	var zarr = [] ;
	
	// avatar attributes
	var sped = 8 ;
	
	// environment setup

	function logKey(e) {
		if (newl) {
			zpos = levl() ; 
			newl = 0 ;
		} else {
			move(`${e.code}` ) ;
			zpos = posx.toString() + "px, -" + posy.toString() + "px) ; \" class=\"row\">" ;
		}
		document.getElementById("zone").innerHTML = zpre + zpos + zsuf ;
		document.getElementById("dbug").innerHTML = posx.toString() + "," + posy.toString() ;
	}
	
	function move(k) {
		if ((k == "KeyS" || k == "ArrowDown")  && (posy - sped) >= 0 ) {
			posy -= sped ;
		}
		if ((k == "KeyD" || k == "ArrowRight") && (posx - sped) >= 0 )  {
			posx -= sped ;
		}
		if ((k == "KeyW" || k == "ArrowUp")    && (posy + sped) <= window.innerHeight) {
			posy += sped ;
		}
		if ((k == "KeyA" || k == "ArrowLeft")  && (posx + sped) <= window.innerWidth ) {
			posx += sped ;
		}
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
				zsuf += "<img src=\"arts/visu/mako/tile.png\"> " ;
			}
			zsuf += "</div>" ;
		}
		zsuf += "</div>" ;
		return zpos ;
	}