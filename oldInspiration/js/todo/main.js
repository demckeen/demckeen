
import ToDos from "./todo.js";
import { getTodos } from "./utilities.js";

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

window.onload = function () {prepareEventHandlers();}

function prepareEventHandlers() {
toDos.completeToDo();
toDos.removeToDo();
toDos.filterToDo();}