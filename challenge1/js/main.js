
import ToDos from "./toDos.js";

const toDos = new ToDos;

toDos.getTodos();

let button = document.getElementById('addNewTask');

button.addEventListener('click', addTask);
document.getElementById('newTask').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addTask();
    }
});

function addTask() {
    toDos.addTodo();
    toDos.listTodos();
}

toDos.completeToDo();
toDos.removeToDo();
toDos.filterToDo();




// if (newTask) {
//     task = document.getElementById('newTask').textContent;

//     this.id = function logSubmit() {new Date()};
//           const form = document.getElementById('addNewTask');
//           form.addEventListener('click', logSubmit);     
//     this.content = newTask;
//     this.bool = true;

//     console.log(newTask);}