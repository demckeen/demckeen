class App {
    constructor() {
        this.artdata = []
    }

    async init() {
        await this.getArtdata('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,main_reference_number,image_id')
        displayHTML(buildArtworkCard(this.artdata));
    }

    async getArtdata(url) {
        const data = await fetchArtdata(url)
        console.log(this)
        this.artdata = data.data
        console.log(this.artdata.length);
        const randomIndex = Math.floor(Math.random() * this.artdata.length);
        this.artdata = this.artdata[randomIndex];
        console.log(this.artdata);
        return this.artdata;
    }

    async next() {
        if (!this.nextUrl) return
        await this.getArtdata(this.nextUrl)
        displayHTML(buildListView(this.artdata))
    }

    async prev() {
        if (!this.prevUrl) return
        await this.getArtdata(this.prevUrl)
        displayHTML(buildListView(this.artdata))
    }

}

const app = new App()
app.init()


// async function to get data set and return it
async function fetchArtdata(url) {
    try {
        return await fetch(url).then(res => res.json())
    } catch (e) {
        console.error(e)
    }
}

async function reloadArtworkCard() {
    try {
        return await fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,main_reference_number,image_id').then(result => result.json())
    } catch (e) {
        console.error(e)
    }
}

function displayHTML(html) {
    apiArea = document.getElementById('apiArea');
    artCard = document.createElement('div');
    artCard.setAttribute('id', 'artCard');
    apiArea.appendChild(artCard);
    artCard.innerHTML = html
    document.getElementById('artCard').addEventListener('click', reloadArtworkCard);
}

function buildListView(artdata) {
    return `
        <div class="list">
            ${artdata.reduce((acc, artwork) => {
                return acc + buildArtworkCard(artwork)
            }, "")}
        </div>
    `
}

let id = 0;

function buildArtworkCard(artwork) {
    id += 1;
    if (!artwork.artist_title) {
        artwork.artist_title = "Unknown";
    }

    return `
        <section class="artworkCard noselect" id="${ id }">
            <div class="cardimg">
            <img class="artimg" id="artimg" src="https://www.artic.edu/iiif/2/${ artwork.image_id }/full/843,/0/default.jpg"></div>
            <div class="cardheading" id="cardheading">
            <h2 class="artworkTitle" id="artworkTitle">${ artwork.title }</h2>
            <h3 class="artistName" id="artistName">${ artwork.artist_title }</h3></div>
        </section>
    `
}

function refreshArtworkCard(artwork) {
        image = document.getElementById('artimg');
        title = document.getElementById('artworkTitle');
        let name = document.getElementById('artistName');
        let id = artwork.image_id;
        image.setAttribute('src', `https://www.artic.edu/iiif/2/${ id }/full/843,/0/default.jpg`);
        title.innerHTML = artwork.title;
        name.innerHTML = artwork.artist_title;}

