//EventEmitter is class
//emit("event param"):trigger/create/fire and on("event emit param",callback fun):listner that registered
// const EventEmitter=require("events"); 
// const event=new EventEmitter();
// // event.on("greet",()=>{
// //     console.log("this is event emitter");
    
// // })
// event.once("greet",()=>{
//     console.log("call event only once");
    
// })
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");
//.1 Create a custom EventEmitter that triggers "greet" or "exit"                                                                                          

// class MyEmitter extends EventEmitter{}
// const event=new MyEmitter()
// event.on("greet",(msg)=>{
// console.log(`hello ${msg}`);//Template literals: `${var}`

// })
// event.on("exit",()=>{
//     console.log("exits myemitter application....");
    
// })
// event.emit("greet","CSE 21 this is fsd class");
// event.emit("exit")
//2. Simulate DOM-like event handling in Node.js using events
//Button:click and mouseover events
const EventEmitter=require("events");
class Button extends EventEmitter
{
    click(){
        console.log("/n call button click event");
        this.emit("click");
    }
mouseover(){
    console.log("/n call button mouseover event");
    this.emit("mouseover");
}
}
const button=new Button();
button.on("click", () => {
    console.log("Button clicked!");
});
button.on("mouseover", () => {
    console.log("Button hovered!");
});