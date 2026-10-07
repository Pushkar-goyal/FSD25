import { writeFile, readFile, appendFile, unlink } from "node:fs/promises";

const fileName = "studentdata.json";


async function createFile() {
    try {
        await writeFile(
            fileName,
            "Name: PRINCE JAISWAL\nEmail: princejaiswalpj251105@gmail.com\nCourse: B.Tech CSE",
            "utf8"
        );

        console.log("File created successfully");
    }
    catch(error) {
        console.log("Error:", error.message);
    }
}



async function readFileData() {
    try {
        const data = await readFile(fileName, "utf8");

        console.log("\nFile Content:");
        console.log(data);
    }
    catch(error) {
        console.log("Error:", error.message);
    }
}



async function updateFile() {
    try {
        await appendFile(
            fileName,
            "\nCollege: ABES Engineering College",
            "utf8"
        );

        console.log("\nFile updated successfully");
    }
    catch(error) {
        console.log("Error:", error.message);
    }
}



async function deleteFile() {
    try {
        await unlink(fileName);

        console.log("\nFile deleted successfully");
    }
    catch(error) {
        console.log("Error:", error.message);
    }
}



async function main() {

    await createFile();

    await readFileData();

    await updateFile();

    await deleteFile();
}

main();