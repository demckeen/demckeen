class App {
    constructor() {
        this.data = []
        this.nextUrl = ""
        this.prevUrl = ""
    }

    async init() {
        await this.getdata('https://www.poemist.com/api/v1/randompoems')
        displayHTML(buildListView(this.data))
    }

    async getdata(url) {
        const data = await fetchdata(url)
        console.log(this)
        this.data = data
        // console.log(poems);
        // this.nextUrl = data.next
        // this.prevUrl = data.previous
    }

    // async next() {
    //     if (!this.nextUrl) return
    //     await this.getdata(this.nextUrl)
    //     displayHTML(buildListView(this.data))
    // }
}

const app = new App()
app.init()

// async function to get data set and return it
async function fetchdata(url) {
    try {
        return await fetch(url).then(res => res.json())
    } catch (e) {
        console.error(e)
    }
}

function displayHTML(html) {
    document.getElementById('view').innerHTML = html
    showDetails();
}

function buildListView(data) {
    return `
        <div class="list">
            ${data.reduce((acc, item) => {
                return acc + buildCard(item)
            }, "")}
        </div>
    `
}

let id = 0;

function buildCard(item) {
    id += 1;
    //insert API specific details you wish to display on the card element
    if (!item.poet.name) {
        item.poet.name = "Unknown";
    }

    return `
        <section class="card noselect" id="${ id }">
            <div class="cardheading">
            <h2 class="itemTitle">${ item.title }</h2>
            <h3 class="poetName">${ item.poet.name }</h3></div>
            <text class="poem">${ item.content }</text>
            <div class="links>
            <a href="${ item.url }>Link to Poem</a> | <a href="${item.poet.url}">Link to Poet</a></div>
        </section>
    `
}


// add function to window object so it can be used in button onClick handler
const clearData = () => {
    var pageData = document.getElementById("view");
    while (pageData.firstChild) {
        pageData.removeChild(pageData.firstChild);
    }

}

// add function to window object so it can be used in button onClick handler
window.prevData = async () => {
    await app.prev()
}

// add function to window object so it can be used in button onClick handler
window.nextData = async () => {
    await app.next()
}

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function showDetails() {
    let card = document.getElementsByClassName("card");
    for (var i = 0; i < card.length; i++) {
        card[i].addEventListener('click', function(e) {
        let elid = e.target.closest('section').id;
        console.log(elid);
        let element = document.getElementById(elid);
        console.log(element);
        element.querySelector(".details").classList.toggle('hidden');});}}

