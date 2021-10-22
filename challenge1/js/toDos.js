import { readFromLS, writeToLS, toDoList, removeTask, updateTask} from "./ls.js";
import {qs,renderTodoList,onTouch,renderActiveList,renderCompletedList} from "./utilities.js";

export default class ToDos {

    constructor({
        id,
        content,
        completed
    } = {}) {
        this.id = id;
        this.content = content;
        this.completed = completed;
    }

    //  Add a method to the Todos class called addTodo. It should grab the input in the html where users enter 
    //  the text of the task, then send that along with the key to a SaveTodo() function. Then update the display 
    //  with the current list of tasks

    addTodo() {
        let task = new ToDos;

            saveTodo(task, ToDos);
            readFromLS(toDoList);
            console.log(toDoList);
        }

    
    //  Add a method to the Todos class called listTodos(). It should use the renderTodoList function to output our 
    //  todo list when called. It should get called when a todo is added, or removed, and when the Todos class is 
    //  instantiated.

    getTodos() {
        let list = JSON.parse(localStorage.getItem('toDoList'));
        let element = document.getElementById("tasks");
        if (list != "") {
          renderTodoList(list, element);}
    }

    listTodos() {
        let list = toDoList;
        let element = document.getElementById("tasks");
        document.getElementById('newTask').value='';
        renderTodoList(list, element);
    }

    completeToDo() {

        var ul = document.getElementById("tasks");
        ul.addEventListener("click", function(e) {
        if (e.target.className === "checkbox"){
        e.target.classList.toggle("complete");
        e.target.parentNode.classList.toggle("completeli")
        let taskId = e.target.parentNode.id;
        let status = true;
        updateTask(taskId, status);}
        else if (e.target.className === "checkbox complete"){
        e.target.classList.toggle("complete");
        e.target.parentNode.classList.toggle("completeli");
        let taskId = e.target.parentNode.id;
        let status = false;
        updateTask(taskId, status);
        }});
    }

     removeToDo() {
        var ul = document.getElementById("tasks");
        ul.addEventListener("click", function(e) {
        if (e.target.className === "delete"){
            let taskId = e.target.parentNode.id;
            removeTask(taskId);
            }})
     }

    filterToDo() {
        document.getElementById("categories").addEventListener('click', function (e) {
      
        if (e.target.id === "completed") {
            let list = toDoList.filter((task) => task.completed === true);
            let element = document.getElementById("tasks");
            renderCompletedList(list, element)
            e.target.classList.add("shown");
            document.getElementById("all").classList.remove("shown");
            document.getElementById("active").classList.remove("shown");
        }

        else if (e.target.id === "active") {
            let list = toDoList.filter((task) => task.completed === false);
            let element = document.getElementById("tasks");
            renderActiveList(list, element);
            e.target.classList.add("shown");
            document.getElementById("completed").classList.remove("shown");
            document.getElementById("all").classList.remove("shown");    
        }

        else if (e.target.id === "all") {
            let list = toDoList;
            let element = document.getElementById("tasks");
            renderTodoList(list, element);
            e.target.classList.add("shown");
            document.getElementById("active").classList.remove("shown");
            document.getElementById("completed").classList.remove("shown");    
        }

    })}}
    
    function saveTodo(task, ToDos) {

        let newTask = document.getElementById('newTask').value;
            task = new ToDos();
            if (newTask) {
                task.id = new Date();
                task.content = newTask;
                task.completed = false;
    
        writeToLS(task, toDoList);
    }}
