// Event

// Event Emitter is a class in which we have to use emit("event emit parameter") for trigger / create / fire event and on("emit parameter", callback function) is a listener that will for register your event.

// Program 1 and 2
// emit()   on() 

const EventEmitter = require("events");
const event = new EventEmitter();
// event.on("greet", ()=> {
//     console.log("This is Event Emitter");
// });

event.once("greet", ()=> {
    console.log("Event trigger only one time");
});

event.emit("greet");
event.emit("greet");
event.emit("greet");
event.emit("greet");



// Program 1 : Create custom EventEmitter that trigger "greet" or "exit".
const eventEmitter = require("events");
class myEmitter extends eventEmitter {}
const Event = new myEmitter()

event.on("greet", (name) => {
    console.log(`Hello $(name)`);        // template literals `$()`
});

event.on("exit", () => {
    console.log("Exits my custom event emitter...");        
});

event.emit("greet","cse25");
event.emit("exit");