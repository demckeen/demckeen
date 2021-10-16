// do a querySelector lookup @param {string} selector The selector passed to querySelector
// @return {element} The matching element or null if not found /

function qs(selector) {
    element = document.getElementById(selector);
    return element;
}

// add a touchend event listener to an element for mobile with a click event fallback for desktops @param 
//{string} elementSelector The selector for the element to attach the listener to
// * @param {function} callback The callback function to run

function onTouch(elementSelector, callback) {

    let element = document.getElementById(elementSelector);
    element.addEventListener('touchend',callback);

    if ('click' in window) {
        element.addEventListener("click", function() {
            let click = function() {
                //call the callback function
                callback();
                //remove the click handler after perform
                this.removeEventListener(click);
            }
            //attach a handler for click event
            this.addEventListener(click);
        });
    }

}

/* foreach todo in list, build a li element for the todo, and append it to element
@param {array} list The list of tasks to render to HTML @param {element} element The DOM element to insert 
our list elements into.
*/

function renderTodoList(list, element) {}