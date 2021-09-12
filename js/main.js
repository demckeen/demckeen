const links = [
    {label: "Week 1: Notes",
     url: "week1/index.html"},
    
    {label: "Week 1: localStorage Example",
    url: "week1/localstorage.html"}
]

for(var i=0; i<links.length; i++){

    document.getElementById("links").innerHTML+=
        '<li>' + '<a href="' + links[i].url + '">' +
        links[i].label  + '</a>' +
        '</li>'
    }
