const fs = require("fs");

// 1. CREATE
fs.writeFile("sample.txt", "Hello! This is my first file.", (err) => {
    if (err) throw err;
    console.log("File created successfully.");

    // 2. READ
    fs.readFile("sample.txt", "utf8", (err, data) => {
        if (err) throw err;
        console.log("\nFile Content:");
        console.log(data);

        // 3. UPDATE
        fs.appendFile("sample.txt", "\nThis line is added later.", (err) => {
            if (err) throw err;
            console.log("\nFile updated successfully.");

            // Read updated file
            fs.readFile("sample.txt", "utf8", (err, updatedData) => {
                if (err) throw err;
                console.log("\nUpdated File Content:");
                console.log(updatedData);

                // 4. DELETE
                fs.unlink("sample.txt", (err) => {
                    if (err) throw err;
                    console.log("\nFile deleted successfully.");
                });
            });
        });
    });
});