// //function in javascript
// function hello() {
//     console.log("this is js function");
// } 
// hello();
// console.log("synchronous javascript");      
// asyncronous javascript

// arrow function
// variable : var,let and const
// syntax : ()=>{}
//     const hello=()=>{
//         console.log("this is js function");
//         setTimeout(()=>{
//             console.log("this is asynchronous javascript");
//         }, 2000);
//     }
//     hello()
//     console.log("synchronous javascript");

// function as parameter argument
// function hello(n1,n2) {  
//     console.log(n1+n2);
//     console.log(arguments);
// }
// let a=10
// let b=20
// hello(a,b);
const app=()=>{
 console.log(arguments);  
 console.log(window) 
}