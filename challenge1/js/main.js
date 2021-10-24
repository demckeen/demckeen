
import ToDos from "./toDos.js";
import { getTodos } from "./utilities.js";

const toDos = new ToDos;

getTodos();

let button = document.getElementById('addNewTask');

document.querySelector("#addTask").addEventListener("submit", function(e){
      addTask();
      e.preventDefault();    //stop form from submitting
  });

// button.addEventListener('click', addTask);
// button.addEventListener('touchend', addTask);
// document.getElementById('newTask').addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') {
//       addTask();
//     }
// });

function addTask() {
    toDos.addTodo();
    toDos.listTodos();
}

window.onload = function () {prepareEventHandlers();}

function prepareEventHandlers() {
toDos.completeToDo();
toDos.removeToDo();
toDos.filterToDo();}




// if (newTask) {
//     task = document.getElementById('newTask').textContent;

//     this.id = function logSubmit() {new Date()};
//           const form = document.getElementById('addNewTask');
//           form.addEventListener('click', logSubmit);     
//     this.content = newTask;
//     this.bool = true;

//     console.log(newTask);}