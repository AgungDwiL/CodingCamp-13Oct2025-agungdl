// Database Task Simulation
let tasksDb = [];

function addTask() {
    const taskInput = document.getElementById('todo-input');   
    const taskDate = document.getElementById('todo-date');

    if (validateInput(taskInput.value, taskDate.value)) {
        const newTask = {
            task: taskInput.value,
            date: taskDate.value
        }

        tasksDb.push(newTask);

        displayTasks();
    }
}

function displayTasks() {
    const taskList= document.getElementById('task-list');
    taskList.innerHTML = '';

    tasksDb.forEach((taskObj, index) => {
        taskList.innerHTML += `<li>${taskObj.task} - ${taskObj.date} </li>`;
    });
}


function deleteAllTasks() {
    tasksDb = [];
    displayTasks();
}

function filterTasks() {}

function validateInput(task, date) {
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}

