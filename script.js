// Get references to the input box, list container, and category select
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categorySelect = document.getElementById('category-select'); // get the category select element
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // load tasks from localStorage or initializes an empty array
let selectedCategory = 'All'; // Track the selected category

// Add task function
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let taskText = inputBox.value; // get the task text
        let category = categorySelect.value; // get the selected category
        tasks.push({ text: taskText, category: category }); // add task to the tasks array
        inputBox.value = ""; // clear the input box
        renderTasks(); // render tasks
        saveData(); // save tasks to localstorage
    }
}

// Filter tasks by category
function filterTasks(category) {
    let filteredTasks = tasks.filter(task => category === 'All' || task.category === category);
    renderTasks(filteredTasks);
    updateCategoryHighlight(category); // Highlight selected category
}

// Render tasks in the UI
function renderTasks(taskArray = tasks) {
    listContainer.innerHTML = ''; // Clear list
    taskArray.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>[${task.category}]</strong> ${task.text}`;
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.onclick = (event) => {
            event.stopPropagation(); // Prevent task toggle on edit click
            editTask(index);
        };
        li.appendChild(editButton);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // set the inner html to "X"
        span.onclick = (event) => {
            event.stopPropagation(); // Prevent task toggle on delete click
            deleteTask(index);
        };
        li.appendChild(span);

        if (task.completed) {
            li.classList.add("checked");
        }

        li.onclick = () => {
            task.completed = !task.completed;
            renderTasks();
            saveData();
        };

        listContainer.appendChild(li);
    });
}

function editTask(index) {
    let newTaskText = prompt("Edit your Task:", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
        renderTasks();
        saveData();
    }
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    saveData();
}

// Save tasks to localStorage
function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Highlight selected category in the sidebar
function updateCategoryHighlight(selectedCategory) {
    const categoryItems = document.querySelectorAll("#category-list li");
    
    categoryItems.forEach(item => {
        item.classList.remove("selected-category");
        item.querySelector(".checkmark").style.display = "none"; // Hide all checkmarks
    });

    const selectedItem = document.getElementById(selectedCategory);
    selectedItem.classList.add("selected-category");
    selectedItem.querySelector(".checkmark").style.display = "inline"; // Show the checkmark for the selected category
}

// Load tasks on page load
renderTasks(); // Initial rendering of tasks
updateCategoryHighlight('All'); // Default highlight on page load
