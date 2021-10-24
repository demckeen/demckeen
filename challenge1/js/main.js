
import ToDos from "./toDos.js";
import { getTodos } from "./utilities.js";

const toDos = new ToDos;

getTodos();

let button = document.getElementById('addNewTask');

button.addEventListener('click', addTask);
button.addEventListener('touchend', addTask);
document.getElementById('newTask').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTask();
    }

    else if (e.key === '13') {
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




// if (newTask) {
//     task = document.getElementById('newTask').textContent;

//     this.id = function logSubmit() {new Date()};
//           const form = document.getElementById('addNewTask');
//           form.addEventListener('click', logSubmit);     
//     this.content = newTask;
//     this.bool = true;

//     console.log(newTask);}