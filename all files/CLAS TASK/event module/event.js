//Event module
//Event class uses -on() as listener and emit() as event trigger/create/fire
// const EventEmitter= require('events');
// const event=new EventEmitter();
const f1=()=>{
    console.log("f1");
    
};
function f2(){
    console.log("f2");
    
};
const f3=function test() {
    console.log('main');
    setTimeout(f1,50);
    setTimeout(f3,50);
    new Promise((resolve,rej)=>{
     resolve("i am promises");
    }).then((result)=>{
        console.log(result);
        
    });
    
}
f2(); f3();