const toDoList = null;

// build a todo object, add it to the todoList, and save the new list to local storage.
// @param {string} key The key under which the value is stored under in LS @param {string} task The text of the 
//task to be saved.

function saveTodo(/*task, key*/) {
    const task = {id:'', content: '', completed: ''}}

// A todo should look like this: { id : timestamp, content: string, completed: bool }

/* check the contents of todoList, a local variable containing a list of ToDos. If it is null then pull 
the list of todos from localstorage, update the local variable, and return it @param {string} key The key 
under which the value is stored under in LS @return {array} The value as an array of objects
*/

// function getTodos(key) {}

export default class ToDos {
    constructor({id,content,completed} = {}) {
        this.id = id;
        this.content = content;
        this.completed = completed;    }}

//     // Add a method to the Todos class called addTodo. It should grab the input in the html where users enter 
//     // the text of the task, then send that along with the key to a SaveTodo() function. Then update the display 
//     // with the current list of tasks

//     // Add a method to the Todos class called addTodo. It should grab the input in the html where users enter the 
//     // text of the task, then send that along with the key to a SaveTodo() function. Then update the display with 
//     // the current list of tasks

//     // Add a method to the Todos class called listTodos(). It should use the renderTodoList function to output our 
//     // todo list when called. It should get called when a todo is added, or removed, and when the Todos class is 
//     // instantiated.

//     // completeToDo()

//     // removeToDo()

//     // filterToDo()

//     render() {
//         return `
//         <li data-hike-name="${this.name}">
//             <h2 class="hikeStyles__header">${this.name}</h2>
//             <div class="container">
//                 <div class="hikeStyles__image"><img src="${this.imgSrc}" alt="${this.imgAlt}"></div>
//                 <div class="hikeStyles__content">
//                     <div>
//                         <h3>Distance</h3>
//                         <p>${this.distance}</p>
//                     </div>
//                     <div>
//                         <h3>Difficulty</h3>
//                         <p>${this.difficulty}</p>
//                     </div>
//                 </div>
//             </div>
//         </li>`
//     }

//     renderDetailed() {
//         return `
//         <li>
//             <h2 class="hikeStyles__header">
//                 <button onclick="window.location.reload()">Go Back</button>
//                 <span>${this.name}</span>
//             </h2>
//             <div class="hikeStyles__image"><img src="${this.imgSrc}" alt="${this.imgAlt}"></div>
//             <div class="hikeStyles__content">
//                 <div>
//                     <h3>Distance</h3>
//                     <p>${this.distance}</p>
//                 </div>
//                 <div>
//                     <h3>Difficulty</h3>
//                     <p>${this.difficulty}</p>
//                 </div>
//                 <div>
//                     <h3> Description </h3>
//                     <p>${this.description}</p>
//                 </div>
//                 <div>
//                     <h3> Directions </h3>
//                     <p>${this.directions}</p>
//                 </div>
//             </div>
//         </li>`
//     }
// }