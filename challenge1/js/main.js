
// import ToDos from "./toDos";

class ToDos {
    constructor({id,content,completed} = {}) {
        this.id = id;
        this.content = content;
        this.completed = completed;    }}

let newTask = document.getElementById('newTask').value;
let button = document.getElementById('addNewTask');

function saveTodo() {
    const task = new ToDos();
    let newTask = document.getElementById('newTask').value;
    if (newTask) {
        task.id = new Date();
            //   const form = document.getElementById('addNewTask');
            //   form.addEventListener('click', logSubmit);     
        task.content = newTask;
        task.completed = false;
    
        
        // window.localStorage.setItem('task',JSON.stringify(task));
        // console.log(JSON.parse(window.localStorage.getItem('task')));
        }}

button.addEventListener('click', saveTodo);


// if (newTask) {
//     task = document.getElementById('newTask').textContent;

//     this.id = function logSubmit() {new Date()};
//           const form = document.getElementById('addNewTask');
//           form.addEventListener('click', logSubmit);     
//     this.content = newTask;
//     this.bool = true;

//     console.log(newTask);}