// Asynchronous is using async / await
async function test() {
    console.log("2: message");
    await console.log("3: message");
    console.log("4: message");
}
console.log("1: message");

test()
console.log("5: message");

// Create promises that resolve with Assignment submitted and print using then(), reject with submission failed
const assignment = new Promise(function(resolve, reject) {
    let submitted = true;

    if (submitted) {
        resolve("Assignment submitted");
    } else {
        reject("Submission failed");
    }
});

assignment.then(function(result) {
    console.log(result);
}).catch(function(error) {
    console.log(error);
});


// Async function that display user data
async function displayUserData() {
    return {
        name: "Raj",
        id: 101,
        password: "Raj@123"
    };
}

displayUserData().then(function(result) {
    console.log("Name :", result.name);
    console.log("ID :", result.id);
    console.log("Password :", result.password);
}).catch(function(error) {
    console.log(error);
});


// Async function for data json data fetch
async function data() {
    await console.log("2: message");
    const response = await fetch("./studentdata.json");
    console.log(response.status);

    const student = await response.json();
    return student;

    await console.log("3: message");
    console.log("4: message");
}
console.log("1: message");
data().then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
})