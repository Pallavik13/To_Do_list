const taskInput = document.getElementById('list');
const taskList = document.getElementById('todo');

// Retrieve tasks from localStorage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Populate the task list with saved tasks
savedTasks.forEach(task => {
    addTaskToDOM(task);
});

function addTaskToLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    addTaskToLocalStorage(taskText, false);
    addTaskToDOM({ text: taskText, completed: false });

    taskInput.value = '';
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const label = document.createElement('label');
    label.textContent = task.text;
    label.style.textDecoration = task.completed ? 'line-through' : 'none';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        taskList.removeChild(li);
        deleteTaskFromLocalStorage(task.text);
    };

    checkbox.onchange = function () {
        label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        updateTaskInLocalStorage(task.text, checkbox.checked);
    };

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

function deleteTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function updateTaskInLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task =>
        task.text === taskText ? { text: taskText, completed: completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
