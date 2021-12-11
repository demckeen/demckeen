var url = "https://colormind.io/api/";
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
    let apiArea = document.getElementById('apiArea');
    let paletteCard = document.createElement('div');
    let color1 = palette[0].toString();
    let color2 = palette[1].toString();
    let color3 = palette[2].toString();
    let color4 = palette[3].toString();
    let color5 = palette[4].toString();

    console.log(color1);

    function RGBToHex(rgb) {
        // Choose correct separator
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        // Turn "rgb(r,g,b)" into [r,g,b]
        rgb = rgb.substr(4).split(")")[0].split(sep);
      
        let r = (+rgb[0]).toString(16),
            g = (+rgb[1]).toString(16),
            b = (+rgb[2]).toString(16);

        console.log(b);
      
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
      
        return "#" + r + g + b;
      }
    
    console.log(RGBToHex(color1));

    paletteCard.setAttribute('id','paletteCard');
    apiArea.appendChild(paletteCard);
    paletteCard.innerHTML = 
        `<div id="swatchArea">
            <div id="swatch1"></div>
            <div id="swatch2"></div>
            <div id="swatch3"></div>
            <div id="swatch4"></div>
            <div id="swatch5"></div>
            <div class="colorcode">RGB: ${ color1 }</div>
            <div class="colorcode">RGB: ${ color2 }</div>
            <div class="colorcode">RGB: ${ color3 }</div>
            <div class="colorcode">RGB: ${ color4 }</div>
            <div class="colorcode">RGB: ${ color5 }</div>
         </div>
         <div id="paletteActions"></div>
        `
    swatch1.style.background = `rgb(${ color1 })`; 
    swatch2.style.background = `rgb(${ color2 })`; 
    swatch3.style.background = `rgb(${ color3 })`; 
    swatch4.style.background = `rgb(${ color4 })`; 
    swatch5.style.background = `rgb(${ color5 })`; 
}

// function RGBToHex(rgb) {
//     // Choose correct separator
//     let sep = rgb.indexOf(",") > -1 ? "," : " ";
//     // Turn "rgb(r,g,b)" into [r,g,b]
//     rgb = rgb.substr(4).split(")")[0].split(sep);
  
//     let r = (+rgb[0]).toString(16),
//         g = (+rgb[1]).toString(16),
//         b = (+rgb[2]).toString(16);
  
//     if (r.length == 1)
//       r = "0" + r;
//     if (g.length == 1)
//       g = "0" + g;
//     if (b.length == 1)
//       b = "0" + b;
  
//     return "#" + r + g + b;
//   }


