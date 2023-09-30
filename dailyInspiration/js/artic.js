import ToDos from "./todo/todo.js";
import { addArtwork } from "./todo/main.js";

const toDos = new ToDos;

let artdata = [];

let harvardKey = 'a06bc1e8-dad7-4ade-a5d6-342d53759637';

async function loadartdata() {
    try {
        const random = Math.round(Math.random() * 9).toString();
        console.log(random);
        const initial = await fetch('https://api.harvardartmuseums.org/object?classification=26&hasimage=1&imagecount=2&apikey=' + harvardKey);

        const initialData = await initial.json();
        console.log(initialData);
        return initialData;

        // const artworkId = initialData.records[random].id;

        // console.log(artworkId);

        // const result = await fetch('https://api.harvardartmuseums.org/object/' + artworkId + '?apikey=' + harvardKey);

        // const data = await result.json();
        // console.log(data);
        // return data;
    } catch (error) {
        console.log('loadartdata', error);
    }
}

async function loadartworkdata(artworkId) {
    try {
         console.log(artworkId);

        const result = await fetch('https://api.harvardartmuseums.org/object/' + artworkId + '?apikey=' + harvardKey);

        const data = await result.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('loadartdata', error);
    }
}

async function loadRandomArtwork(artdata) {
    const random = Math.round(Math.random() * 9).toString();
    const artworkId = artdata.records[random].id;
    console.log(artworkId);
    const artwork = await loadartworkdata(artworkId)
    console.log(artwork);
    return artwork;
}

async function main() {
    artdata = await loadartdata();
    const artwork = await loadRandomArtwork(artdata);
    console.log(artwork);
    displayArtwork(buildArtworkCard(artwork));
    buildOverlay(artwork);
}

function displayArtwork(html) {
    let apiArea = document.getElementById('apiArea');
    let artCard = document.createElement('div');
    artCard.setAttribute('id', 'artCard');
    apiArea.appendChild(artCard);
    artCard.innerHTML = html
    document.getElementById('artworkRefresh').addEventListener('click', refreshArtworkCard);
    document.getElementById('saveArtwork').addEventListener('click', addArtwork);
}

function buildArtworkCard(artwork) {
    if (!artwork.artist_title) {
        artwork.artist_title = "Unknown";
    }
    console.log(artwork);
    let baseuri;
    let imgUrl;
    if (!artwork.images['0']) {
        baseuri = "";
    console.log(baseuri);}
    else {
        baseuri = artwork.images['0'].iiifbaseuri;
    }

    if(!baseuri) {
        imgUrl = '/img/no-image.svg';
    }
    else {
        imgUrl = `${ baseuri }/full/full/0/default.jpg`;

    }

    return `
        <div id="artCard">
        <section class="artworkCard noselect">
            <div class="cardimg">
            <img class="artimg" id="artimg" src="${ imgUrl }"></div>
            <div class="cardheading" id="cardheading">
            <h2 class="artworkTitle" id="artworkTitle">${ artwork.title }</h2>
            <h3 class="artistName" id="artistName">${ artwork.artist_title }</h3>
            <div id="actionButtons"><span title="Save Artwork to Ideas List" id="saveArtwork"><i class="far fa-lightbulb"></i></span>
            <span id="artworkExpand" title="See Full Image"><i class="fas fa-expand-alt"></i></span>
            <span id="artworkRefresh" title="See New Artwork"><i class="fas fa-sync"></i></span></div></div>
        </section>
        </div>
    `
}

async function refreshArtworkCard(artwork) {
    artdata = await loadartdata();
    artwork = await loadRandomArtwork(artdata);
    if (!artwork.artist_title) {
        artwork.artist_title = "Unknown";
    }
    let fullImg = document.getElementById('fullImg');
    let image = document.getElementById('artimg');
    let title = document.getElementById('artworkTitle');
    let name = document.getElementById('artistName');
    let baseuri;
    let imgUrl;
    if (!artwork.images['0']) {
        baseuri = "";
    console.log(baseuri);}
    else {
        baseuri = artwork.images['0'].iiifbaseuri;
    }

    if(!baseuri) {
        imgUrl = '/img/no-image.svg';
    }
    else {
        imgUrl = `${ baseuri }/full/full/0/default.jpg`;

    }

        image.setAttribute('src', `${ imgUrl }`);
        fullImg.setAttribute('src', `${ imgUrl }`);

    title.innerHTML = artwork.title;
    name.innerHTML = artwork.artist_title;
}

function on() {
    document.getElementById("imgOverlay").style.display = "block";
}

function off() {
    document.getElementById("imgOverlay").style.display = "none";
}

function buildOverlay(artwork) {
    let imgOverlay = document.createElement('div');
    let fullImg = document.createElement('img');
    let baseuri = artwork.images['0'].iiifbaseuri;
    imgOverlay.setAttribute('id','imgOverlay');
    fullImg.setAttribute('id', 'fullImg');
    if(!artwork.image_id) {
        fullImg.setAttribute('src', `/img/no-image.svg`)
    }
    else {
    fullImg.setAttribute('src', `${ baseuri }full/full/0/default.jpg`);}
    apiArea.appendChild(imgOverlay);
    imgOverlay.appendChild(fullImg);    
    document.getElementById('artworkExpand').addEventListener('click', on);
    document.getElementById('imgOverlay').addEventListener('click', off);
}


main()