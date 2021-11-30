let poemData = [];

async function loadPoemData() {
    try {
        const result = await fetch('https://www.poemist.com/api/v1/randompoems');
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
    poemCard.innerHTML = "<span id='loadingbox'>Loading Poem...<span>"
    poemData = await loadPoemData();
    const poem = poemData[0];
    displayPoem(buildCard(poem));
}

function displayPoem(html) {
    poemCard.innerHTML = html
    document.getElementById('poemCard').addEventListener('click', refreshPoem);
}

function buildCard(item) {
    //insert API specific details you wish to display on the card element
    if (!item.poet.name) {
        item.poet.name = "Unknown";
    }

    console.log(item.url);

    return `
            <div class="poemCardheading">
            <h2 class="poemTitle" id="poemTitle">${ item.title }</h2>
            <h3 class="poetName" id="poetName">${ item.poet.name }</h3></div>
            <text class="poem" id="poem">${ item.content }</text>
            <div class="poetryLinks" id="poetryLinks">
            <a id="poemLink" href="${ item.url }">Link to Poem</a> | <a id="poetLink" href="${item.poet.url}">Link to Poet</a></div>
    `
}

async function refreshPoem(poem) {
    let title = document.getElementById('poemTitle');
    let name = document.getElementById('poetName');
    let content = document.getElementById('poem');
    title.innerHTML = "Loading New Poem...";
    name.innerHTML = '';
    content.innerHTML = '';
    
    poemData = await loadPoemData();
    poem = poemData[0];
    if (!poem.poet.name) {poem.poet.name = "Unknown";}
    
    console.log(poem);

    title = document.getElementById('poemTitle');
    name = document.getElementById('poetName');
    content = document.getElementById('poem');
    poetLink.setAttribute('href', poem.url);
    poetLink.setAttribute('href', poem.poet.url);
    title.innerHTML = poem.title;
    name.innerHTML = poem.poet.name;
    content.innerHTML = poem.content;}

main()
