export {readFromLS, writeToLS, toDoList, removeTask, updateTask};

// read a value from local storage and parse it as JSON @param {string} key The key under which 
// the value is stored under in LS
// @return {array} The value as an array of objects

let toDoList = [];

function readFromLS(toDoList) {
    toDoList = JSON.parse(window.localStorage.getItem(toDoList))
    return toDoList;
 }

// write an array of objects to local storage under the provided key @param {string} key The key 
// under which the value is stored under in LS
// * @param {array} data The information to be stored as an array of objects. Must be serialized.

function writeToLS(task, toDoList) { 
    toDoList.push(task);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
 }

function removeTask(taskId) {
    toDoList = toDoList.filter(element => String(element.id) !== taskId);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    document.getElementById(taskId).remove();

  }

function updateTask(taskId, status) {
    toDoList = toDoList.map(item => {if (String(item.id) === taskId)
    {return {...item, completed: status}}
    else {return item}});
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}