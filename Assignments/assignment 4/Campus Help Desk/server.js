const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

const dataFile = path.join(__dirname, "requests.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readRequests() {
    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, "[]");
    }

    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function saveRequests(requests) {
    fs.writeFileSync(
        dataFile,
        JSON.stringify(requests, null, 2)
    );
}

// Get all requests
app.get("/api/requests", (req, res) => {
    res.json(readRequests());
});

// Get single request
app.get("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const request = requests.find(
        item => item.id === Number(req.params.id)
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    res.json(request);
});

// Create request
app.post("/api/requests", (req, res) => {
    const requests = readRequests();

    const {
        studentName,
        email,
        category,
        description,
        priority
    } = req.body;

    if (
        !studentName ||
        !email ||
        !category ||
        !description ||
        !priority
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newRequest = {
        id: Date.now(),
        studentName,
        email,
        category,
        description,
        priority
    };

    requests.push(newRequest);
    saveRequests(requests);

    res.status(201).json(newRequest);
});

// Update request
app.put("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const index = requests.findIndex(
        item => item.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    const {
        studentName,
        email,
        category,
        description,
        priority
    } = req.body;

    if (
        !studentName ||
        !email ||
        !category ||
        !description ||
        !priority
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    requests[index] = {
        ...requests[index],
        studentName,
        email,
        category,
        description,
        priority
    };

    saveRequests(requests);

    res.json(requests[index]);
});

// Delete request
app.delete("/api/requests/:id", (req, res) => {
    const requests = readRequests();

    const filtered = requests.filter(
        item => item.id !== Number(req.params.id)
    );

    if (filtered.length === requests.length) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    saveRequests(filtered);

    res.json({
        message: "Request deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(
        `Campus Help Desk running at http://localhost:${PORT}`
    );
});