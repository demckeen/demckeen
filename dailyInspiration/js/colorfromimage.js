let palette;

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
      document.getElementById('imageLink').setAttribute('src', imageUrl);
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

}


function buildSwatches(palette) {
  return `
      <div class="list">
          ${palette.reduce((acc, color) => {
              return acc + buildSwatch(color)
          }, "")}
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

// document.getElementById('tryAgain').addEventListener('click', refreshColorPalette);

async function refreshColorPalette() {
  scheme = document.getElementById('scheme').value;
  randomColor = document.getElementById('colorname').innerHTML.slice(1);
  var url = `https://www.thecolorapi.com/scheme?hex=${randomColor}&format=json&mode=${scheme}&count=6`;
  console.log(url);
  await fetch(url)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      palette = data.colors;
      console.log(palette); // this will be a string
    });

  let swatch1 = document.getElementById('swatch1');
  let swatch2 = document.getElementById('swatch2');
  let swatch3 = document.getElementById('swatch3');
  let swatch4 = document.getElementById('swatch4');
  let swatch5 = document.getElementById('swatch5');
  let swatch6 = document.getElementById('swatch6');

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
