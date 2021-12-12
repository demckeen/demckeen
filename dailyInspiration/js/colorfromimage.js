import ToDos from "./todo/todo.js";
import { addColors } from "./todo/main.js";

const toDos = new ToDos;

let clientId = '1Z8wPPFry6vTJu5trwq8GPlML83yLCZQTuwFRBMURTE'
let imageUrl;
let imageSrc;
let imageData;

/*!
 * Get the contrasting color for any hex color
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
function setContrastText(hexcolor) {

  hexcolor = hexcolor.html_code;

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


async function setImage() {
  var url = `https://api.unsplash.com/photos/random?query=content_filter=low&count=1&client_id=${clientId}`;
  await fetch(url)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      imageData = data[0];
      imageUrl = imageData.links.html;
      imageSrc = imageData.urls.regular;
      document.getElementById('colorImg').setAttribute('src', imageSrc);
      document.getElementById('imageLink').setAttribute('href', imageUrl);
      loadImgColorPalette(imageSrc);
    });
}

async function fetchColorData(url) {
  let paletteSrc = encodeURIComponent(url);

  let paletteUrl = "https://api.imagga.com/v2/colors?image_url=" + paletteSrc;

  try {
      return await fetch(paletteUrl, {
        headers: {
          Authorization: "Basic YWNjXzc2MDg1OGJmMDZhNzY5ZTphZGE5NmRiOWEyY2Y1YjhjMDQ2MDBlNjk1M2UyZjEyZQ==",
          "Content-Type": "multipart/form-data"}})
          .then(res => res.json());
  } catch (e) {
      console.error(e)
  }
}

setImage();

async function loadImgColorPalette(imageSrc) {

  let palette = await fetchColorData(imageSrc)
  console.log(palette);
  palette = palette.result.colors.image_colors;
  console.log(palette);

  console.log(palette[0].html_code);


displayPalette(buildSwatches(palette));
buildImgOverlay(imageSrc);
document.getElementById('paletteRefresh').addEventListener('click', refreshColorPalette);
document.getElementById('savePalette').addEventListener('click', addColors);
}

async function refreshColorPalette() {
var url = `https://api.unsplash.com/photos/random?query=content_filter=low&count=1&client_id=${clientId}`;
  await fetch(url)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data)
      imageData = data[0];
      imageUrl = imageData.links.html;
      imageSrc = imageData.urls.regular;
      document.getElementById('colorImg').setAttribute('src', imageSrc);
      document.getElementById('imageLink').setAttribute('href', imageUrl);
      document.getElementById('colorFullImg').setAttribute('src', imageSrc);
      updateColorPalette(imageSrc);
    });
}

async function updateColorPalette(imageSrc) {

  let palette = await fetchColorData(imageSrc)
  console.log(palette);
  palette = palette.result.colors.image_colors;
  console.log(palette);

  console.log(palette[0].html_code);


displayPalette(buildSwatches(palette));
document.getElementById('savePalette').addEventListener('click', addColors);
document.getElementById('colorImageExpand').addEventListener('click', on);
document.getElementById('colorImgOverlay').addEventListener('click', off);
}


function buildSwatches(palette) {
  return `
      <div class="list" id="swatchList">
          ${palette.reduce((acc, color) => {
              return acc + buildSwatch(color)
          }, "")}
          <div id="colorActionButtons"><span title="Save codes to Ideas List" id="savePalette"><i class="fas fa-download"></i></span>
          <span id="colorImageExpand" title="Expand Image"><i class="fas fa-expand-alt"></i></span>
          <span id="paletteRefresh" title="New Image and Palette"><i class="fas fa-sync"></i></span></div>
      </div>
  `
}

let id = 0;

function buildSwatch(color) {
    id += 1;
    let textColor = setContrastText(color);
    return `
        <div class="imgSwatch noselect" id="color${ id }" style="background-color: ${color.html_code}">
            <span class="paletteHex" style="color:${textColor}">${color.html_code}</span>
        </div>
    `
}

function displayPalette(content) {
  document.getElementById('imgSwatchBox').innerHTML = content;
}

function on() {
  document.getElementById("colorImgOverlay").style.display = "block";
}

function off() {
  document.getElementById("colorImgOverlay").style.display = "none";
}

function buildImgOverlay(imageSrc) {
  let imgOverlay = document.createElement('div');
  let fullImg = document.createElement('img');
  imgOverlay.setAttribute('id','colorImgOverlay');
  fullImg.setAttribute('id', 'colorFullImg');
  fullImg.setAttribute('src', imageSrc);
  apiArea.appendChild(imgOverlay);
  imgOverlay.appendChild(fullImg);    
  document.getElementById('colorImageExpand').addEventListener('click', on);
  document.getElementById('colorImgOverlay').addEventListener('click', off);
  document.getElementById('savePalette').addEventListener('click', savePalette);
}
