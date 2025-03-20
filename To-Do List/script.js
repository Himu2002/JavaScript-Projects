// Select input and list container elements from the DOM
const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

// Function to add a new task
function addTask() {
    // Check if the input is empty
    if (inputBox.value === '') {
        alert("You must write something") // Alert the user if no text is entered
    } else {
        // Create a new <li> element for the task
        let li = document.createElement("li")
        li.innerHTML = inputBox.value // Set the task text
        listContainer.appendChild(li) // Add the <li> to the task list

        // Create a <span> element for the delete (×) button
        let span = document.createElement("span")
        span.innerHTML = "\u00d7" // Unicode for "×" symbol
        li.appendChild(span) // Add the delete button inside the <li>
    }

    // Clear the input box after adding the task
    inputBox.value = ""

    // Save the updated task list to localStorage
    saveData()
}

// Event listener for marking tasks as checked or deleting them
listContainer.addEventListener("click", function(e) {
    // If a <li> (task) is clicked, toggle the 'checked' class
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
        saveData() // Save the updated list state
    }
    // If a <span> (delete button) is clicked, remove the task
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove()
        saveData() // Save the updated list state
    }
}, false)

// Function to save task list data in localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

// Function to display saved tasks when the page loads
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "" // Load data or start empty
}
showTask() // Display tasks on page load
