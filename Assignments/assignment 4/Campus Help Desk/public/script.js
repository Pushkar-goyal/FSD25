const form = document.getElementById("requestForm");
const requestsContainer = document.getElementById("requestsContainer");

let editingId = null;

async function loadRequests() {
    try {
        const response = await fetch("/api/requests");
        const requests = await response.json();

        displayRequests(requests);
    } catch (error) {
        requestsContainer.innerHTML = `
            <div class="empty">
                Unable to load requests.
            </div>
        `;
    }
}

function displayRequests(requests) {
    if (requests.length === 0) {
        requestsContainer.innerHTML = `
            <div class="empty">
                No requests submitted yet.
            </div>
        `;
        return;
    }

    requestsContainer.innerHTML = requests.map(request => `
        <div class="request">

            <h3>${escapeHTML(request.studentName)}</h3>

            <p>
                <strong>Email:</strong>
                ${escapeHTML(request.email)}
            </p>

            <p>
                <strong>Category:</strong>
                ${escapeHTML(request.category)}
            </p>

            <p>
                <strong>Priority:</strong>
                ${escapeHTML(request.priority)}
            </p>

            <p>
                <strong>Problem:</strong>
                ${escapeHTML(request.description)}
            </p>

            <button
                class="edit-btn"
                onclick="editRequest(${request.id})"
            >
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteRequest(${request.id})"
            >
                Delete
            </button>

        </div>
    `).join("");
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const requestData = {
        studentName: document.getElementById("studentName").value.trim(),
        email: document.getElementById("email").value.trim(),
        category: document.getElementById("category").value,
        priority: document.getElementById("priority").value,
        description: document.getElementById("description").value.trim()
    };

    try {
        let response;

        if (editingId === null) {
            response = await fetch("/api/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });
        } else {
            response = await fetch(`/api/requests/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });
        }

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Something went wrong.");
            return;
        }

        alert(
            editingId === null
                ? "Request submitted successfully."
                : "Request updated successfully."
        );

        form.reset();
        editingId = null;

        document.querySelector(
            "#requestForm button[type='submit']"
        ).textContent = "Submit Request";

        loadRequests();

    } catch (error) {
        alert("Unable to connect to server.");
    }
});

async function editRequest(id) {
    try {
        const response = await fetch(`/api/requests/${id}`);
        const request = await response.json();

        if (!response.ok) {
            alert(request.message || "Request not found.");
            return;
        }

        document.getElementById("studentName").value = request.studentName;
        document.getElementById("email").value = request.email;
        document.getElementById("category").value = request.category;
        document.getElementById("priority").value = request.priority;
        document.getElementById("description").value = request.description;

        editingId = id;

        document.querySelector(
            "#requestForm button[type='submit']"
        ).textContent = "Update Request";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        alert("Unable to load request.");
    }
}

async function deleteRequest(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`/api/requests/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Unable to delete request.");
            return;
        }

        alert("Request deleted successfully.");

        loadRequests();

    } catch (error) {
        alert("Unable to connect to server.");
    }
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

loadRequests();