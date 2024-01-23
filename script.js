document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("currentUser")) {
    renderDashboard();
  } else {
    renderLogin();
  }
});

function renderLogin() {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" required>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="#" onclick="renderSignup()">Sign up</a></p>
    `;

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    handleLogin(username, password);
  });
}

function renderSignup() {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = `
        <h2>Sign Up</h2>
        <form id="signupForm">
            <label for="newUsername">New Username:</label>
            <input type="text" id="newUsername" required>
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" required>
            <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="#" onclick="renderLogin()">Login</a></p>
    `;

  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    handleSignup(newUsername, newPassword);
  });
}

function handleLogin(username, password) {
  if (username === "user" && password === "pass") {
    localStorage.setItem("currentUser", username);
    renderDashboard();
  } else {
    alert("Invalid credentials. Please try again.");
  }
}

function handleSignup(username, password) {
  localStorage.setItem("currentUser", username);
  renderDashboard();
}

function renderDashboard() {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = `
        <h2>Welcome, ${localStorage.getItem("currentUser")}!</h2>
        <button onclick="renderTaskForm()">Create Task</button>
        <div id="taskList"></div>
        <button onclick="logout()">Logout</button>
    `;
  renderTaskList();
}

function renderTaskForm() {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML += `
        <h3>Create Task</h3>
        <form id="taskForm">
            <label for="taskTitle">Title:</label>
            <input type="text" id="taskTitle" required>
            <label for="taskDescription">Description:</label>
            <textarea id="taskDescription" required></textarea>
            <label for="taskDeadline">Deadline:</label>
            <input type="date" id="taskDeadline" required>
            <button type="submit">Create</button>
        </form>
    `;

  document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const deadline = document.getElementById("taskDeadline").value;
    createTask(title, description, deadline);
  });
}

function renderTaskList() {
  const taskListDiv = document.getElementById("taskList");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskListDiv.innerHTML = "<h3>Task List</h3>";
  if (tasks.length === 0) {
    taskListDiv.innerHTML += "<p>No tasks available.</p>";
  } else {
    tasks.forEach((task) => {
      taskListDiv.innerHTML += `
                <div class="task-item">
                    <h4>${task.title}</h4>
                    <p>${task.description}</p>
                    <p>Deadline: ${task.deadline}</p>
                </div>
            `;
    });
  }
}

function createTask(title, description, deadline) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ title, description, deadline });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTaskList();
}

function logout() {
  localStorage.removeItem("currentUser");
  renderLogin();
}
