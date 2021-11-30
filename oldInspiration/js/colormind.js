var url = "http://colormind.io/api/";
var data = {
	model : "default",
}

var http = new XMLHttpRequest();
let palette;

http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		palette = JSON.parse(http.responseText).result;
        console.log(palette);
        buildPalette(palette);
	}
    
}

http.open("POST", url, true);
http.send(JSON.stringify(data));

function buildPalette(palette) {
    let swatch1 = palette[0].toString();
    let swatch2 = palette[1].toString();
    let swatch3 = palette[2].toString();
    let swatch4 = palette[3].toString();
    let swatch5 = palette[4].toString();
    console.log(swatch1);
    document.getElementById('swatch1').style.background = `rgb(${ swatch1 })`; 
    document.getElementById('swatch2').style.background = `rgb(${ swatch2 })`; 
    document.getElementById('swatch3').style.background = `rgb(${ swatch3 })`; 
    document.getElementById('swatch4').style.background = `rgb(${ swatch4 })`; 
    document.getElementById('swatch5').style.background = `rgb(${ swatch5 })`; 
}
