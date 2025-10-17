// Database Task Simulation
let tasksDb = [];
let isFiltered = false;
let filteredDate = null;

// Add Task Function
function addTask() {
    // Capture input values
    const taskInput = document.getElementById('todo-input');   
    const taskDate = document.getElementById('todo-date');

    // Validate input
    if (validateInput(taskInput.value, taskDate.value)) {
        const newTask = {
            task: taskInput.value,
            date: taskDate.value
        }

        // Add new task to the simulated database if validation passes
        tasksDb.push(newTask);

        // display updated task list
        displayTasks();

        // Clear input fields
        taskInput.value = '';
        taskDate.value = '';

        // Reset filter
        resetFilter();
    }
}

// Display Tasks Function
function displayTasks(tasks = tasksDb) {
    // Capture the task list element
    const taskList= document.getElementById('task-list');
    taskList.innerHTML = '';

    // Validate if there are no tasks to display
    if (tasks.length === 0) {
        taskList.innerHTML = '<li>No task added yet.</li>';
        return;
    }

    // Display tasks from the simulated database
    tasks.forEach((taskObj, index) => {
        taskList.innerHTML += `<li>${taskObj.task} - ${taskObj.date} </li>`;
    });
}


// delete All Tasks Function
function deleteAllTasks() {
    // Clear the simulated database
    tasksDb = [];

    // Display updated task list
    displayTasks();

    // reset filter
    resetFilter();
}

// Input Validation Function
function validateInput(task, date) {
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}

// Open & Close pop up modal filter date
function openFilterModal() {
    document.getElementById('filter-modal').style.display = 'block';
}

function closeFilterModal() {
    document.getElementById('filter-modal').style.display = 'none';
}

// === Filter Logic ===
function applyFilter() {
    const dateValue = document.getElementById('filter-date').value;
    if (dateValue.trim() === '') {
        alert('Please select a date first.');
        return;
    }

    const filtered = tasksDb.filter(task => task.date === dateValue);
    displayTasks(filtered);

    // Update status
    isFiltered = true;
    filteredDate = dateValue;
    document.getElementById('filter-icon').style.display = 'inline';
    document.getElementById('reset-filter-btn').style.display = 'inline';

    closeFilterModal();
}

// Reset Filter Function
function resetFilter() {
    isFiltered = false;
    filteredDate = null;
    document.getElementById('filter-icon').style.display = 'none';
    document.getElementById('reset-filter-btn').style.display = 'none';
    displayTasks();
}

