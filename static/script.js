const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskContainer = document.getElementById("task-container");

// Server URL
const serverUrl = "http://127.0.0.1:5000";

// Function to fetch tasks from the server
function fetchTasks() {
  fetch(`${serverUrl}/tasks`)
    .then((response) => response.json())
    .then((tasks) => displayTasks(tasks))
    .catch((error) => console.error("Error fetching tasks:", error));
}

// Enter tasks to the database
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskTitle = taskInput.value;
  if (!taskTitle) {
    return alert("Please enter a task");
  }
  // Add task to the server
  fetch(`${serverUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskTitle }),
  })
    .then((response) => response.json())
    .then(fetchTasks);

  taskInput.value = "";
});

// Initial fetch of tasks when the page loads
fetchTasks();



// Function to display the tasks
function displayTasks(tasks) {
  taskContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    console.log(task._id);
    taskDiv.innerHTML = `
                <span>${task.title}</span>
                <div class="buttons">
                <button onclick="editTask('${task._id}')">Edit</button>
                <button onclick="deleteTask('${task._id}')">Delete</button>
                </div>
            `;
    taskContainer.appendChild(taskDiv);
  });
}


//Function to edit a task
function editTask(taskId) {
  // Add your edit logic here
  const newTitle = prompt("Enter new task title:");
  if (newTitle) {
    fetch(`${serverUrl}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((response) => response.json())
      .then(fetchTasks)
      .catch((error) => console.error("Error editing task:", error));
  }
}

// Function to delete a task
function deleteTask(taskId) {
  // Add your delete logic here
    fetch(`${serverUrl}/tasks/${taskId}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then(fetchTasks)
        .catch((error) => console.error("Error deleting task:", error));
  console.log(`Delete task with ID: ${taskId}`);
}
