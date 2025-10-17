const addButton = document.getElementById('addButton');
const inputTextBox = document.getElementById('todoInput');
const todoList = document.querySelector('.todo-list');
const inProgressSpan = document.querySelector('.count-row p:first-child span');
const completedSpan = document.querySelector('.count-row p:last-child span');

addButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    addTask();
});

inputTextBox.addEventListener('keypress', e => {
    if (e.key === "Enter") {
        e.preventDefault(); 
        addTask();
    }
})

function addTask() {
    const todoInput = inputTextBox.value.trim();

    if (todoInput === '') return alert("Please enter a task!");

    const li = document.createElement('li');
    li.classList.add('todo');
    li.innerHTML = `<input type="checkbox" class="todo-checkbox">
                <p class="todo-text">${todoInput}</p>
                <img src="trash.png" alt="Trash icon" class="delete-icon">`;

    todoList.appendChild(li);
    inputTextBox.value = '';
    updateCounts();
}

function updateCounts() {
    const todos = document.querySelectorAll('.todo');
    let inProgress = 0;
    let completed = 0;

    todos.forEach(todo => {
        const checkbox = todo.querySelector('.todo-checkbox');
        if (checkbox.checked) {
            completed++;
        } else {
            inProgress++;
        }
    });

    inProgressSpan.textContent = inProgress;
    completedSpan.textContent = completed;
}

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-checkbox')) {
        const todoText = e.target.nextElementSibling;
        todoText.classList.toggle('completed');
        updateCounts();
    } else if (e.target.classList.contains('delete-icon')) {
        e.target.closest('.todo').remove();
        updateCounts();
    }
});

