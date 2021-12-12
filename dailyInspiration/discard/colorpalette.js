let randomColor;

function generateColor() {
  randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.getElementById('swatch').style.backgroundColor = "#" + randomColor;
  document.getElementById('colorname').innerHTML = "#" + randomColor;
  document.getElementById('colorname').style.color = setContrastText(randomColor);
}

// function generatePalette {

// }

/*!
 * Get the contrasting color for any hex color
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
function setContrastText(hexcolor) {

  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor.split('').map(function (hex) {
      return hex + hex;
    }).join('');
  }

  // Convert to RGB value
  let r = parseInt(hexcolor.substr(0, 2), 16);
  let g = parseInt(hexcolor.substr(2, 2), 16);
  let b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // Check contrast
  return (yiq >= 128) ? 'black' : 'white';

}


generateColor()

let palette;
let reject;

var scheme = document.getElementById('scheme').value;

//the colorAPI version

// fetch("https://colors1.p.rapidapi.com/analogous?hexcolor=82BDA7", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "colors1.p.rapidapi.com",
// 		"x-rapidapi-key": "b96a074cffmsh23f63a366989a10p17a4f8jsna47a5cf98441"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// // })

async function loadColorPalette() {
  if(!scheme) { scheme = 'complementary'}
  randomColor = document.getElementById('colorname').innerHTML.slice(1);
  var url = `https://colors1.p.rapidapi.com/${scheme}?hexcolor=${randomColor.toUpperCase()}`;
  // var url = `https://www.thecolorapi.com/scheme?hex=${randomColor}&format=json&mode=${scheme}&count=6`;
  console.log(url);
  await fetch(url, {
    "method": "GET",
    "headers": {	"x-rapidapi-host": "colors1.p.rapidapi.com",
		"x-rapidapi-key": "b96a074cffmsh23f63a366989a10p17a4f8jsna47a5cf98441",}
  })
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    palette = data;
    console.log(palette );
    // console.log(palette); // this will be a string
  });

 let swatch1 =  document.getElementById('swatch1');
 let swatch2 =  document.getElementById('swatch2');
 let swatch3 =  document.getElementById('swatch3');
 let swatch4 =  document.getElementById('swatch4');
 let swatch5 =  document.getElementById('swatch5');
 let swatch6 =  document.getElementById('swatch6');

 swatch1.style.backgroundColor = palette[0].hex.value;
 swatch2.style.backgroundColor = palette[1].hex.value;
 swatch3.style.backgroundColor = palette[2].hex.value;
 swatch4.style.backgroundColor = palette[3].hex.value;
 swatch5.style.backgroundColor = palette[4].hex.value;
 swatch6.style.backgroundColor = palette[5].hex.value;

 swatch1.innerHTML = palette[0].hex.value;
 swatch2.innerHTML = palette[1].hex.value;
 swatch3.innerHTML = palette[2].hex.value;
 swatch4.innerHTML = palette[3].hex.value;
 swatch5.innerHTML = palette[4].hex.value;
 swatch6.innerHTML = palette[5].hex.value;

}

document.getElementById('colorRefresh').addEventListener('click', generateColor);
document.getElementById('generatePalette').addEventListener('click', loadColorPalette);
document.getElementById('tryAgain').addEventListener('click', refreshColorPalette);

async function refreshColorPalette() {
  scheme = document.getElementById('scheme').value;
  randomColor = document.getElementById('colorname').innerHTML.slice(1);
  var url = `https://www.thecolorapi.com/scheme?hex=${randomColor}&format=json&mode=${scheme}&count=6`;
  console.log(url);
  await fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    palette = data.colors;
    console.log(palette); // this will be a string
  });

 let swatch1 =  document.getElementById('swatch1');
 let swatch2 =  document.getElementById('swatch2');
 let swatch3 =  document.getElementById('swatch3');
 let swatch4 =  document.getElementById('swatch4');
 let swatch5 =  document.getElementById('swatch5');
 let swatch6 =  document.getElementById('swatch6');

 swatch1.style.backgroundColor = palette[0].hex.value;
 swatch2.style.backgroundColor = palette[1].hex.value;
 swatch3.style.backgroundColor = palette[2].hex.value;
 swatch4.style.backgroundColor = palette[3].hex.value;
 swatch5.style.backgroundColor = palette[4].hex.value;
 swatch6.style.backgroundColor = palette[5].hex.value;

 swatch1.innerHTML = palette[0].hex.value;
 swatch2.innerHTML = palette[1].hex.value;
 swatch3.innerHTML = palette[2].hex.value;
 swatch4.innerHTML = palette[3].hex.value;
 swatch5.innerHTML = palette[4].hex.value;
 swatch6.innerHTML = palette[5].hex.value;

}



// http.onreadystatechange = function() {
// 	if(http.readyState == 4 && http.status == 200) {
// 		palette = JSON.parse(http.responseText).result;
//         console.log(palette);
//         buildPalette(palette);
// 	}

// }

// http.open("POST", url, true);
// http.send(JSON.stringify(data));

// function buildPalette(palette) {
//     let apiArea = document.getElementById('apiArea');
//     let paletteCard = document.createElement('div');
//     let color1 = palette[0].toString();
//     let color2 = palette[1].toString();
//     let color3 = palette[2].toString();
//     let color4 = palette[3].toString();
//     let color5 = palette[4].toString();

//     console.log(color1);

//     function RGBToHex(rgb) {
//         // Choose correct separator
//         let sep = rgb.indexOf(",") > -1 ? "," : " ";
//         // Turn "rgb(r,g,b)" into [r,g,b]
//         rgb = rgb.substr(4).split(")")[0].split(sep);

//         let r = (+rgb[0]).toString(16),
//             g = (+rgb[1]).toString(16),
//             b = (+rgb[2]).toString(16);

//         console.log(b);

//         if (r.length == 1)
//           r = "0" + r;
//         if (g.length == 1)
//           g = "0" + g;
//         if (b.length == 1)
//           b = "0" + b;

//         return "#" + r + g + b;
//       }

//     console.log(RGBToHex(color1));

//     paletteCard.setAttribute('id','paletteCard');
//     apiArea.appendChild(paletteCard);
//     paletteCard.innerHTML = 
//             <div id="swatch1"></div>
//             <div id="swatch2"></div>
//             <div id="swatch3"></div>
//             <div id="swatch4"></div>
//             <div id="swatch5"></div>
//             <div class="colorcode">RGB: ${ color1 }</div>
//             <div class="colorcode">RGB: ${ color2 }</div>
//             <div class="colorcode">RGB: ${ color3 }</div>
//             <div class="colorcode">RGB: ${ color4 }</div>
//             <div class="colorcode">RGB: ${ color5 }</div>
//          </div>
//          <div id="paletteActions"></div>
//         `
//     swatch1.style.background = `rgb(${ color1 })`; 
//     swatch2.style.background = `rgb(${ color2 })`; 
//     swatch3.style.background = `rgb(${ color3 })`; 
//     swatch4.style.background = `rgb(${ color4 })`; 
//     swatch5.style.background = `rgb(${ color5 })`; 
// }

// let apiKey = "AIzaSyDZvgXbMtOb7loGYaPUVWoun2CD4fL0oL0";
// let fontsList = [];
// let el;

// async function loadFontsList() {
//     try {
//         const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey);
//         const data = await result.json();
//         console.log('loaded google fonts list: ', data.items.length);
//         return data.items;
//     } catch (error) {
//         console.log('loadFontsList', error, error.message);
//     }
// }
// function loadRandomFont(fontsList) {
//     const randomIndex = Math.floor(Math.random() * fontsList.length);
//     const choosedFontDetails = fontsList[randomIndex];
//     console.log(choosedFontDetails);
//     const choosedFont = choosedFontDetails.family;
//     WebFont.load({
//         google: {
//             families: [choosedFont]
//         }
//     });
//     console.log('choosed font: ', choosedFont);
//     return choosedFontDetails;
// }
// function updateFont(el, choosedFontDetails) {
//     let main = document.getElementById('apiArea');
//     el = document.createElement('div');
//     el.setAttribute('class','box');
//     el.setAttribute('id','fontBox');
//     el.style.fontFamily = choosedFontDetails.family;
//     el.setAttribute('title', choosedFontDetails.family);
//     let glyph = document.createElement('span');
//     let title = document.createElement('span');
//     let link = document.createElement('a');
//     let fileLink = document.createElement('a');
//     glyph.setAttribute('id', 'glyph');
//     glyph.textContent = 'g';
//     title.textContent = choosedFontDetails.family;
//     title.setAttribute('id', 'fontTitle');
//     link.setAttribute('href', "https://fonts.google.com/specimen/"+ choosedFontDetails.family);
//     link.setAttribute('title', "See more about " + choosedFontDetails.family + " here.")
//     link.setAttribute('id', 'fontLink');
//     link.textContent = "See more about this font here";
//     fileLink.setAttribute('href', choosedFontDetails.files.regular);
//     fileLink.setAttribute('title', "Direct download link for " + choosedFontDetails.family + " here.")
//     fileLink.setAttribute('id', 'downloadLink');
//     fileLink.textContent = "Click to download the regular weight of this font";
//     main.appendChild(el);
//     el.appendChild(glyph);
//     el.appendChild(title);
//     el.appendChild(link);
//     el.appendChild(fileLink);
//     el.addEventListener('click', () => {
//     reloadFont(el, choosedFontDetails);
// });

// }
// async function main() {
//     fontsList = await loadFontsList();
//     const choosedFontDetails = loadRandomFont(fontsList);
//     updateFont(el, choosedFontDetails);
// }

// function reloadFont(el, title, link, fileLink, choosedFontDetails) {
//         choosedFontDetails = loadRandomFont(fontsList);
//         el = document.querySelector(".box");
//         title = document.getElementById('fontTitle');
//         link = document.getElementById('fontLink');
//         fileLink = document.getElementById('downloadLink');
//         el.style.fontFamily = choosedFontDetails.family;
//         title.setAttribute('title', choosedFontDetails.family);
//         title.textContent = choosedFontDetails.family;
//         link.setAttribute('href', "https://fonts.google.com/specimen/"+ choosedFontDetails.family);
//         link.setAttribute('title', "Learn more about "+ choosedFontDetails.family + " here");
//         fileLink.setAttribute('href', choosedFontDetails.files.regular);
//         fileLink.setAttribute('title', "Direct download link for " + choosedFontDetails.family + " here.");
//     }

// main();