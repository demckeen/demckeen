const links = [
    {label: "Week 1: Notes",
     url: "week1/index.html"},
    
    {label: "Week 1: localStorage Example",
    url: "week1/localstorage.html"},

    {label: "Week 2: Notes",
    url: "week2/index.html"},

    {label: "Week 2: Quiz Ninja Exercise",
    url: "week2/quizninja.html"},

    {label: "Week 3: Notes & Exercises",
    url: "week3/index.html"},

    {label: "Week 4: Notes & Exercises",
    url: "week4/index.html"},

    {label: "Week 5: Notes & Exercises",
    url: "week5/index.html"},
]

for(var i=0; i<links.length; i++){

    document.getElementById("links").innerHTML+=
        '<li>' + '<a href="' + links[i].url + '">' +
        links[i].label  + '</a>' +
        '</li>'
    }
