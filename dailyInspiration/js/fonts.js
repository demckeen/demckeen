import ToDos from "./todo/todo.js";
import { addFont } from "./todo/main.js";

const toDos = new ToDos;

let apiKey = "AIzaSyDZvgXbMtOb7loGYaPUVWoun2CD4fL0oL0";
let fontsList = [];
let el;

async function loadFontsList() {
    try {
        const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey);
        const data = await result.json();
        console.log('loaded google fonts list: ', data.items.length);
        return data.items;
    } catch (error) {
        console.log('loadFontsList', error, error.message);
    }
}
function loadRandomFont(fontsList) {
    const randomIndex = Math.floor(Math.random() * fontsList.length);
    const choosedFontDetails = fontsList[randomIndex];
    console.log(choosedFontDetails);
    const choosedFont = choosedFontDetails.family;
    WebFont.load({
        google: {
            families: [choosedFont]
        }
    });
    console.log('choosed font: ', choosedFont);
    return choosedFontDetails;
}
function updateFont(el, choosedFontDetails) {
    let main = document.getElementById('apiArea');
    el = document.createElement('div');
    el.setAttribute('class','box');
    el.setAttribute('id','fontBox');
    el.style.fontFamily = choosedFontDetails.family;
    el.setAttribute('title', choosedFontDetails.family);
    let glyph = document.createElement('span');
    let title = document.createElement('span');
    let link = document.createElement('a');
    let fileLink = document.createElement('a');
    let textArea = document.createElement('div');
    let refresh = document.createElement('span');
    let save = document.createElement('span');
    let actions = document.createElement('div');
    actions.setAttribute('id', 'fontActions');
    save.setAttribute('id', 'saveFont');
    refresh.setAttribute('id', 'fontRefresh');
    refresh.setAttribute('title', 'See a New Font');
    textArea.setAttribute('id', 'fontLinksBox');
    save.setAttribute('title', 'Save Font Name to Ideas List');
    glyph.setAttribute('id', 'glyph');
    glyph.textContent = 'g';
    title.textContent = choosedFontDetails.family;
    title.setAttribute('id', 'fontTitle');
    link.setAttribute('href', "https://fonts.google.com/specimen/"+ choosedFontDetails.family);
    link.setAttribute('title', "See more about " + choosedFontDetails.family + " here.")
    link.setAttribute('id', 'fontLink');
    link.textContent = "See more about this font";
    fileLink.setAttribute('href', choosedFontDetails.files.regular);
    fileLink.setAttribute('title', "Direct download link for " + choosedFontDetails.family + " here.")
    fileLink.setAttribute('id', 'downloadLink');
    fileLink.textContent = "Download this font";
    main.appendChild(el);
    el.appendChild(glyph);
    el.appendChild(title);
    el.appendChild(textArea);
    textArea.appendChild(link);
    textArea.appendChild(fileLink);
    textArea.appendChild(actions);
    actions.appendChild(save);
    actions.appendChild(refresh);
    save.innerHTML = '<i class="far fa-lightbulb"></i>';
    refresh.innerHTML = '<i class="fas fa-sync"></i>';
    refresh.addEventListener('click', () => {
    reloadFont(el, choosedFontDetails);});
    save.addEventListener('click', addFont);

}
async function main() {
    fontsList = await loadFontsList();
    const choosedFontDetails = loadRandomFont(fontsList);
    updateFont(el, choosedFontDetails);
}

function reloadFont(el, title, link, fileLink, choosedFontDetails) {
        choosedFontDetails = loadRandomFont(fontsList);
        el = document.querySelector(".box");
        title = document.getElementById('fontTitle');
        link = document.getElementById('fontLink');
        fileLink = document.getElementById('downloadLink');
        el.style.fontFamily = choosedFontDetails.family;
        title.setAttribute('title', choosedFontDetails.family);
        title.textContent = choosedFontDetails.family;
        link.setAttribute('href', "https://fonts.google.com/specimen/"+ choosedFontDetails.family);
        link.setAttribute('title', "Learn more about "+ choosedFontDetails.family + " here");
        fileLink.setAttribute('href', choosedFontDetails.files.regular);
        fileLink.setAttribute('title', "Direct download link for " + choosedFontDetails.family + " here.");
    }

main();