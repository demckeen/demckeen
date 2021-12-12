
import ToDos from "./todo.js";
import { getTodos } from "./utilities.js";
export { addColors, addFont, addPoem, addArtwork };

const toDos = new ToDos;

getTodos();

// window.addEventListener("keydown",checkWord);  
// function checkWord(event){
//   console.log(event.keyCode);
// }

var button = document.getElementById('addNewTask');

document.querySelector("#addTask").addEventListener("submit", function(e){
      e.preventDefault();
      addTask();    //stop form from submitting
  });

button.addEventListener('click', addTask);
button.addEventListener('touchend', addTask);
document.getElementById('newTask').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTask();
    }
});

function addTask() {
    toDos.addTodo();
    toDos.listTodos();
}

function addColors() {
    toDos.addColorPalette();
    toDos.listTodos();
}

function addFont() {
  toDos.addFontName();
  toDos.listTodos();
}

function addPoem() {
  toDos.addPoemInfo();
  toDos.listTodos();
}

function addArtwork() {
  toDos.addArtworkInfo();
  toDos.listTodos();
}


window.onload = function () {prepareEventHandlers();}

function prepareEventHandlers() {
toDos.completeToDo();
toDos.removeToDo();
toDos.filterToDo();}

function toggleIdeas() {
  let x = document.getElementById("listContent");
  let button = document.getElementById('listDropTitle');
  let page = document.getElementById('pageWrapper');

  if (x.style.display === "none") {
    x.style.display = "block";
    button.classList.add('faded');
    page.classList.add('gridded');
  } else {
    x.style.display = "none";
    button.classList.remove('faded');
    page.classList.remove('gridded');
  }
}

document.getElementById('listDropTitle').addEventListener('click', toggleIdeas);
