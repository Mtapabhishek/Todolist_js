let tasks = [];
const tasksList = document.getElementById("list");
const addTaskInputBox = document.getElementById("add-task");

function addTodo(task) {

  let flag = false;
  tasks.forEach(t => {

    console.log(t.text.includes(task.text));
    if (t.text.includes(task.text)) {

      flag = true;
    }
  });

  if (flag) {
    alert("already in the list")
    return;
  }
  tasks.push(task);

  renderList();
}

function deleteTodo(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  tasks = newTasks;
  renderList();
}

function renderList() {
  tasksList.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement('li');
    const task = tasks[i];

    li.innerHTML = `
     <input type="checkbox" id="${task.id}" />
     <label for="${task.id}">${task.text}</label>
     <button data-taskId="${task.id}" data-test="test" class="select">Select</button>
   `;
    tasksList.appendChild(li);
  }
}
function checkTodo(taskId) {
  const taskIndex = tasks.findIndex(function (task) {
    return task.id === taskId
  });

  tasks[taskIndex].done = !tasks[taskIndex].done;
}

function initialize() {

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const taskid = Number(e.target.dataset.taskid);

      deleteTodo(taskid);
    }
  });
}
document.getElementById('Add-task').addEventListener('keydown', function (evt) {
  const text = evt.target.value;
  if (evt.key === 'Enter') {


    const task = {
      text: text,
      id: Date.now(),
      done: false
    }
    addTodo(task);

    renderList();
  }
});
initialize();
