let artdata = [];

async function loadartdata() {
    try {
        const result = await fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,main_reference_number,image_id');
        const data = await result.json();
        console.log(data);
        return data.data;
    } catch (error) {
        console.log('loadartdata', error);
    }
}

function loadRandomArtwork(artdata) {
    const randomIndex = Math.floor(Math.random() * artdata.length);
    console.log(artdata.length);
    console.log(randomIndex);
    const artwork = artdata[randomIndex];
    console.log(artwork);
    return artwork;
}

async function main() {
    artdata = await loadartdata();
    const artwork = loadRandomArtwork(artdata);
    displayArtwork(buildArtworkCard(artwork));
}

function displayArtwork(html) {
    let apiArea = document.getElementById('apiArea');
    let artCard = document.createElement('div');
    artCard.setAttribute('id', 'artCard');
    apiArea.appendChild(artCard);
    artCard.innerHTML = html
    document.getElementById('artCard').addEventListener('click', refreshArtworkCard);
}

function buildArtworkCard(artwork) {
    if (!artwork.artist_title) {
        artwork.artist_title = "Unknown";
    }

    return `
        <div id="artCard">
        <section class="artworkCard noselect">
            <div class="cardimg">
            <img class="artimg" id="artimg" src="https://www.artic.edu/iiif/2/${ artwork.image_id }/full/843,/0/default.jpg"></div>
            <div class="cardheading" id="cardheading">
            <h2 class="artworkTitle" id="artworkTitle">${ artwork.title }</h2>
            <h3 class="artistName" id="artistName">${ artwork.artist_title }</h3></div>
        </section>
        </div>
    `
}

async function refreshArtworkCard(artwork) {
    artdata = await loadartdata();
    artwork = loadRandomArtwork(artdata);
    if (!artwork.artist_title) {
        artwork.artist_title = "Unknown";
    }
    image = document.getElementById('artimg');
    title = document.getElementById('artworkTitle');
    let name = document.getElementById('artistName');
    let id = artwork.image_id;
    image.setAttribute('src', `https://www.artic.edu/iiif/2/${ id }/full/843,/0/default.jpg`);
    title.innerHTML = artwork.title;
    name.innerHTML = artwork.artist_title;}


main()