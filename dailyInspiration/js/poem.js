import ToDos from "./todo/todo.js";
import { addPoem } from "./todo/main.js";

const toDos = new ToDos;

let poemData = [];

async function loadPoemData() {
    try {
        const result = await fetch('https://poetrydb.org/random');
        const data = await result.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('loadPoemData', error);
    }}

async function main() {
    let apiArea = document.getElementById('apiArea');
    let poemCard = document.createElement('div');
    poemCard.setAttribute('id', 'poemCard');
    poemCard.setAttribute('class', 'poemCard noselect');
    apiArea.appendChild(poemCard);
    poemCard.innerHTML = "<span id='loadingbox'>Loading Poem...<span>"+
        "<span id='tryAgain' title='Try Again'><i class='fas fa-sync'></i></span></div>";
    document.getElementById('tryAgain').addEventListener('click', refreshPoem);
    poemData = await loadPoemData();
    const poem = poemData[0];
    displayPoem(buildCard(poem));
}

function displayPoem(html) {
    poemCard.innerHTML = html
    document.getElementById('savePoem').addEventListener('click', addPoem);
    document.getElementById('poemRefresh').addEventListener('click', refreshPoem);
}

function buildCard(item) {
    //insert API specific details you wish to display on the card element
    if (!item.author) {
        item.author = "Unknown";
    }

    console.log(item.url);

    return `
            <div class="poemCardheading">
            <h2 class="poemTitle" id="poemTitle">${ item.title }</h2>
            <p class="poetName" id="poetName">${ item.author }</p>
            <div class="poemBox">
                <text class="poem" id="poem">${ item.lines.join('\n') }</text>
            </div>
            <div id='poemActions'><span id='savePoem' title='Save Poem to Ideas List'><i class="far fa-lightbulb"></i></span>
            <span id="poemRefresh" title="Get New Poem"><i class="fas fa-sync"></i></span></div>
    `
}

{/* <a id="poemLink" href="${ item.url }">Link to Poem</a> | <a id="poetLink" href="${item.poet.url}">Link to Poet</a> */}

async function refreshPoem(poem) {
    let title = document.getElementById('poemTitle');
    let name = document.getElementById('poetName');
    let content = document.getElementById('poem');
    title.innerHTML = "Loading New Poem...";
    name.innerHTML = '';
    content.innerHTML = '';
    
    poemData = await loadPoemData();
    poem = poemData[0];
    if (!poem.author) {poem.author = "Unknown";}
    
    console.log(poem);

    title = document.getElementById('poemTitle');
    name = document.getElementById('poetName');
    content = document.getElementById('poem');
    // poetLink.setAttribute('href', poem.url);
    // poetLink.setAttribute('href', poem.poet.url);
    title.innerHTML = poem.title;
    name.innerHTML = poem.author;
    content.innerHTML = poem.lines;}

main()
