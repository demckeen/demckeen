import { readFromLS, toDoList } from "./ls.js";

export {
    renderTodoList,
    renderCompletedList,
    renderActiveList,
    getTodos,
};


/* foreach todo in list, build a li element for the todo, and append it to element
@param {array} list The list of tasks to render to HTML @param {element} element The DOM element to insert 
our list elements into.
*/

function renderTodoList(list, element) {
    element.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        let item = document.createElement("li");
        let checkbox = document.createElement("span");
        let remove = document.createElement("span");
        let task = document.createElement("span");
        let text = list[i].content;
        let id = list[i].id;

        checkbox.classList.add("checkbox");
        remove.classList.add("delete");
        task.classList.add("description");
        item.classList.add("task");
        item.setAttribute('id', id);

        if (list[i].completed === true) {
            checkbox.classList.add("complete");
            item.classList.add("completeli");
        }

        task.textContent = text;
        item.appendChild(checkbox);
        item.appendChild(task);
        item.appendChild(remove);

        element.appendChild(item);

    }
}

function renderCompletedList(list, element) {
    element.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        let item = document.createElement("li");
        let checkbox = document.createElement("span");
        let remove = document.createElement("span");
        let task = document.createElement("span");
        let text = list[i].content;
        let id = list[i].id;

        checkbox.classList.add("checkbox");
        checkbox.classList.add("complete");
        remove.classList.add("delete");
        task.classList.add("description");
        item.classList.add("task");
        item.classList.add("completeli");
        item.setAttribute('id', id);

        task.textContent = text;
        item.appendChild(checkbox);
        item.appendChild(task);
        item.appendChild(remove);

        element.appendChild(item);

    }
}

function renderActiveList(list, element) {
    element.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        let item = document.createElement("li");
        let checkbox = document.createElement("span");
        let remove = document.createElement("span");
        let task = document.createElement("span");
        let text = list[i].content;
        let id = list[i].id;

        checkbox.classList.add("checkbox");
        remove.classList.add("delete");
        task.classList.add("description");
        item.classList.add("task");
        item.setAttribute('id', id);

        task.textContent = text;
        item.appendChild(checkbox);
        item.appendChild(task);
        item.appendChild(remove);

        element.appendChild(item);

    }
}

function getTodos() {
    readFromLS();
    renderTodoList(toDoList, document.getElementById("tasks"));
}