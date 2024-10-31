// Get references to the input box, list container, and category select
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categorySelect = document.getElementById('category-select'); // get the category select element
let tasks = JSON.parse(localStorage.getItem('tasks'))|| []; // load tasks from localStorage or initializes an empty array
let selectedCategory = 'All'; //Track the selected category

// add task function
function addTask(){
    /*If field empty give alert*/
    if(inputBox.value === ''){
        /*change alert to not be alert but field warning*/
        alert("You must write something!");
    }
    
    else{
        let taskText = inputBox.value; // get the task text
        let category = categorySelect.value; // get the selected category
        tasks.push({ text: taskText, category: category }); // add task to the tasks array
        inputBox.value = ""; //clear the input box

        renderTasks(); //render tasks
        saveData(); //save tasks to localstorage
    }
}

// Filter tasks by category and highlight selected category
function filterTasks(category) {
    selectedCategory = category;
    //filter tasks based on the selected category
    let filteredTasks = tasks.filter(task => category === 'All' || task.category === category);
    renderTasks(filteredTasks); //render the filtered tasks
    updateCategoryHighlight();
}

// Render tasks in the UI
function renderTasks(taskArray = tasks) 
{
    listContainer.innerHTML = ''; // Clear list

    // loop through the tasks and create list items
    taskArray.forEach((task, index) => 
        {
        let li = document.createElement("li");// create a new list item
        li.innerHTML =  `<strong>[${task.category}]</strong> ${task.text}`; // show category and task text

        //Add the 'edit' button
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.onclick = (event) =>
        {
            event.stopPropagation(); // Prevent task toggle on edit click
            editTask(index);
        };
        li.appendChild(editButton);

        // Add the "X" (delete) button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // set the inner html to "X"
        span.onclick = (event) => 
        {
            event.stopPropagation(); // Prevent task toggle on delete click
            deleteTask(index); // set the delete function to be called on click
        };
        li.appendChild(span); //append the delete button to the list item

        // Check if task is completed
        if (task.completed) 
        {
            li.classList.add("checked");
        }

        // Toggle the checked status on click
        li.onclick = () => {
            task.completed = !task.completed; // toggle the completed status
            renderTasks(); // re-render tasks
            saveData(); // save updated tasks
        };

        listContainer.appendChild(li); //append the list item to the list container
    });
}

function editTask(index){
    let newTaskText = prompt("Edit your Task:", tasks[index].text);
    if (newTaskText !== null){
        tasks[index].text = newTaskText;
        renderTasks();
        saveData();
    }
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove task from the array
    renderTasks(); //re-render the tasks
    saveData(); //Save the updated tasks to local storage
}

// Save tasks to localStorage
function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // save the tasks as a JSON string
}

//Highlight selected category in the sidebar
function updateCategoryHighlight(){
    const categoryItems = document.querySelectorAll("#category-list li");
    categoryItems.forEach(item => {
        item.classList.remove("selected-category"); // remove highlight from all items
    });
    //Add the selected-category class to the clicked category
    document.getElementById(selectedCategory).classList.add("selected-category");
}

// Load tasks on page load
renderTasks(); //Initial rendering of tasks
updateCategoryHighlight();