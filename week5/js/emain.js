const button = document.getElementById('multiply');
let a;
let b;

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a,b) {


    a = parseInt(document.getElementById("a").value);
    b = parseInt(document.getElementById("b").value);

    for (;;) {
        'use strict';
        try {
            primitiveMultiply(a, b);
            console.log(primitiveMultiply(a,b));
            return;
        } catch (error) {
            console.log("Failed attempt.");
        }
    }

}

function reset() {
    document.getElementById('log').innerHTML = '';
}

document.getElementById('multiply').addEventListener('click', reliableMultiply);
document.getElementById('reset').addEventListener('click', reset);


(function () {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
        old(...arguments);
    }
})();