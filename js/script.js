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
            id: Date.now(), // Unique ID task based on timestamp
            task: taskInput.value,
            date: taskDate.value,
            completed: false // Task completion status
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
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = `<tr><td colspan="4" class="text-center text-gray-500 italic p-3">No task added yet.</td></tr>`;
        return;
    }

    tasks.forEach((taskObj, index) => {
        const row = document.createElement('tr');
        row.className = "hover:bg-gray-100 transition";

        // Member Column
        const noCell = document.createElement('td');
        noCell.textContent = index + 1;
        noCell.className = "border p-2 text-center";

        // Task Column
        const taskCell = document.createElement('td');
        taskCell.textContent = taskObj.task;
        taskCell.className = "border p-2 cursor-pointer";
        if (taskObj.completed) {
            taskCell.classList.add("line-through", "text-gray-400");
        }
        taskCell.onclick = () => toggleComplete(taskObj.id);

        // Date Column
        const dateCell = document.createElement('td');
        dateCell.textContent = taskObj.date;
        dateCell.className = "border p-2 text-center text-sm text-gray-600";

        // Delete Column
        const actionCell = document.createElement('td');
        actionCell.className = "border p-2 text-center";

        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑️';
        delBtn.className = "text-red-500 hover:text-red-700";
        delBtn.onclick = () => deleteTask(taskObj.id);

        actionCell.appendChild(delBtn);

        // Merge all cells into the row
        row.appendChild(noCell);
        row.appendChild(taskCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);

        // Append row to the task list
        taskList.appendChild(row);
    });
}

// Toggle Complete Task Function
function toggleComplete(id) {
    tasksDb = tasksDb.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    displayTasks(isFiltered ? tasksDb.filter(t => t.date === filteredDate) : tasksDb);
}

// Delete per Task Function
function deleteTask(id) {
    tasksDb = tasksDb.filter(t => t.id !== id);
    displayTasks(isFiltered ? tasksDb.filter(t => t.date === filteredDate) : tasksDb);
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

