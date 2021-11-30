var fruits = document.querySelectorAll(".fruit");

var fruit = null;
for (var i = 0; i < fruits.length; i++) {
    fruit = fruits[i];
    fruit.addEventListener('dragstart', function (event) {
        console.log("drop: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        // handle the dragstart event
        source = event.target;
        //set data
        event.dataTransfer.setData("text/plain", event.target.innerHTML);
        //specify allowed transfer
        event.dataTransfer.effectAllowed = "move";
    });

    fruit.addEventListener('dragover', function (event) {
        console.log("drop: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        //handle the dragover event
        //drag over
        event.preventDefault();
        //specify operation
        event.dataTransfer.dropEffect = "move";
    });

    fruit.addEventListener('drop', function (event) {
        console.log("drop: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        //drop
        event.preventDefault();
        event.stopPropagation();
        //update text in dragged item
        source.innerHTML = event.target.innerHTML;
        //update text in drop target
        event.target.innerHTML = event.dataTransfer.getData("text/plain");
        event.target.style.background = "";
    })

    fruit.addEventListener('dragenter', function (event) {
        console.log("drop: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        // highlight potential drop target when the draggable element enters it
        event.target.style.background = "white";
    })

    fruit.addEventListener('dragend', function (event) {
        console.log("drop: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        // reset the transparency
        event.target.style.opacity = "";
    }, false)

    fruit.addEventListener('dragstart', function (event) {
        console.log("drop: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
        // reset the transparency
        event.target.style.opacity = .5;
  }, false);

  fruit.addEventListener('dragleave', function (event) {
    console.log("drop: dropEffect = " + event.dataTransfer.dropEffect + " ; effectAllowed = " + event.dataTransfer.effectAllowed);
    // reset the transparency
    event.target.style.background = "";
})

}