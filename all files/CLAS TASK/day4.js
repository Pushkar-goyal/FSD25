// Event

// Event loop 
const f1 = () => {
};

const f2 = () => {
    console.log("f2");
};

const f3 = function main() {
    console.log("main function");
    setTimeout(f1, 1000);
    setTimeout(f3, 1000);
    new Promise((resolve, reject) => {
        resolve("I am promise")
    }).then((result) => {
        console.log(result);
    })
}
f2();
f3();