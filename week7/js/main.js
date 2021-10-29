class Comments {

    constructor({ hikeName, type } = {}) {
        this.hikeName = hikeName
        this.type = type

        this.comments = []
        this.lsKey = `comments_${this.type}_${this.hikeName}`

        this.retrieveFromLS()
    }

    addComment(content) {
        this.comments.push(new Comment({ content }))
        this.saveToLS()
    }

    retrieveFromLS() {
        let data = JSON.parse(localStorage.getItem(this.lsKey))
        data = data ? data : [];
        this.comments = data.map(datum => new Comment({ ...datum, date: new Date(datum.date) }))
    }

    saveToLS() {
        localStorage.setItem(this.lsKey, JSON.stringify(this.comments))
    }

    render() {
        return `
        <div class="comments">
            <ul class="commentlist">
                ${this.comments.reduce((acc, comment) => {
                    return acc + comment.render()
                }, "")}
            </ul>
        </div>
        `
    }
}

class Comment {
    constructor({ content, date = new Date() } = {}) {
        this.date = date
        this.content = content
    }

    render() {
        return `
            <li class="comment" >
                <span class="commentDate">${this.date.toDateString()}:</span> ${this.content}
            </li>
        `
    }
}

class Hikes {
    constructor({ name, imgSrc, imgAlt, distance, difficulty, description, directions } = {}) {
        this.name = name;
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.distance = distance;
        this.difficulty = difficulty;
        this.description = description;
        this.directions = directions;

        this.comments = new Comments({ hikeName: this.name, type: "hike" })
    }

    render() {
        return `
        <li data-hike-name="${this.name}">
            <h2 class="hikeStyles__header">${this.name}</h2>
            <div class="container">
                <div class="hikeStyles__image"><img src="${this.imgSrc}" alt="${this.imgAlt}"></div>
                <div class="hikeStyles__content">
                    <div>
                        <h3>Distance</h3>
                        <p>${this.distance}</p>
                    </div>
                    <div>
                        <h3>Difficulty</h3>
                        <p>${this.difficulty}</p>
                    </div>
                </div>
            </div>
        </li>`
    }

    renderDetailed() {
        return `
        <li>
        <span class="detailHeader">
            <button onclick="window.location.reload()" id="back">Go Back</button>
            <h2 class="hikeStyles__header">${this.name}
            </h2></span>
            <div class="hikeStyles__image"><img src="${this.imgSrc}" alt="${this.imgAlt}"></div>
            <div class="hikeStyles__content">
                <div>
                    <h3>Distance</h3>
                    <p>${this.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${this.difficulty}</p>
                </div>
                <div>
                    <h3> Description </h3>
                    <p>${this.description}</p>
                </div>
                <div>
                    <h3> Directions </h3>
                    <p>${this.directions}</p>
                </div>
            </div>
        </li>
        <li id="commentinput">
            <div>
            <h3>Add Comment:</h3>
            <textarea placeholder="Enter your comment here" id="commenttextarea"></textarea>
            <button id="commentbutton">Submit Comment</button>
            </div>
        </li>
        ${this.comments.render()}
        `
    }
}

const hikeList = [
    {
        name: "Bechler Falls",
        imgSrc: "https://byui-cit.github.io/cit261/examples/falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description:
            "Beautiful short hike along the Bechler river to Bechler Falls",
        directions:
            "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
        name: "Teton Canyon",
        imgSrc: "https://byui-cit.github.io/cit261/examples/falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short (or long) hike through Teton Canyon.",
        directions:
            "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
        name: "Denanda Falls",
        imgSrc: "https://byui-cit.github.io/cit261/examples/falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "7 miles",
        difficulty: "Moderate",
        description:
            "Beautiful hike through Bechler meadows river to Denanda Falls",
        directions:
            "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];

const hikes = hikeList.map(hikeData => new Hikes(hikeData))

function findNearestHikeElementName(element) {
    while (element.parentElement) {
        const hikeName = element.parentElement.getAttribute('data-hike-name');
        if (hikeName) return hikeName;
        element = element.parentElement;
    }
    return null;
}

//on load grab the array and insert it into the page
window.addEventListener("load", () => {
    mainView();

    window.addEventListener('click', (event) => {
        // onclick, remove all content and render only one list item
        const hikeName = findNearestHikeElementName(event.target)
        if (hikeName) detailedView(hikeName)
    });
});

function detailedView(hikeName) {
    const hike = hikes.find(hike => hike.name === hikeName)
    const hikeHTML = hike.renderDetailed()
    showView([ hikeHTML ])
    document.getElementById('commentbutton').addEventListener('click', () => {
        const commentContent = document.getElementById('commenttextarea').value
        hike.comments.addComment(commentContent)
        showView([ hike.renderDetailed() ])
    })
}

function mainView() {
    const hikesHTML = makeHikeList(hikes);
    showView(hikesHTML);
}

function makeHikeList(hikes) {
    return hikes.map(hike => hike.render())
}

function showView(HTMLList) {
    const element = document.getElementById("hikes");
    element.innerHTML = "";
    HTMLList.forEach(HTMLString => {
        element.insertAdjacentHTML('beforeend', HTMLString);
    });
}