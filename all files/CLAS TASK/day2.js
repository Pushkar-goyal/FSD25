// // callback function
// function hello(n1, n2, callback) {
//     console.log("Hello World");
//     callback();
// }
// let a = 10;
// let b = 20;
// console.log(hello(a, b, sayHi));
// console.log(hello(a, b, sayHello));
// console.log((hello(a, b, function demo() {
//     console.log("callback is calling");
// })));

// function sayHi() {
//     console.log("callback function");
// }
// sayHi();

// function sayHello() {
//     console.log("This is 2nd callback function");
// }
// sayHello();


// callback function
function hello(n1, n2, callback) {
    console.log(n1 + n2);
    callback();
}

let a = 10;
let b = 20;
hello(a, b, sayHi);
hello(a, b, sayHello);
hello(a, b, function demo() {
    console.log("callback is calling");
});

function sayHi() {
    console.log("callback function");
}
sayHi();

function sayHello() {
    console.log("This is 2nd callback function");
}
sayHello();


// Promises
const promiseOne = new Promise((resolve, reject) => {
    console.log("Successfully data passed......");
    resolve("resolve promised");
});
promiseOne.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
}); 


new Promise(function(resolve, reject) {
    setTimeout(function() {
        let msg = "true";
        if(msg) {
            resolve("user : Asynchronous task");
        } else {
            reject("Error : Undefined data...");
        }
        console.log("synchronous task....");
        resolve();
    },1000)
}).then(function(result) {
    console.log("asynchronous task 2");

}).catch(function(error) {
    console.log(error);
});