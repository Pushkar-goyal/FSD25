import fs from "fs/promises";

const fileName = "student.txt";

// 1. CREATE
async function createFile() {
    try {
        await fs.writeFile(
            fileName,
            "Name: Satwik\nCourse: B.Tech CSE",
            "utf8"
        );

        console.log("File created successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}


// 2. READ
async function readFile() {
    try {
        const data = await fs.readFile(fileName, "utf8");

        console.log("\nFile Content:");
        console.log(data);
    } catch (error) {
        console.log("Error:", error.message);
    }
}


// 3. UPDATE
async function updateFile() {
    try {
        await fs.appendFile(
            fileName,
            "\nCollege: ABES Engineering College............",
            "utf8"
        );

        console.log("\nFile updated successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}


// 4. DELETE
async function deleteFile() {
    try {
        await fs.unlink(fileName);

        console.log("\nFile deleted successfully");
    } catch (error) {
        console.log("Error:", error.message);
    }
}


// Execute CRUD operations
async function main() {

    await createFile();

    await readFile();

    await updateFile();

    await deleteFile();
}

main();



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