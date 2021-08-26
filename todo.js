let tasks = [[], [], []];  //Array of task
let currIndex = 0;

const tasksList = document.getElementById("list");  //grab the list
const addTaskInputBox = document.getElementById("Add-task"); //we have to select the input box with id add-task




function addTodo(task) {  //function to add todo list

  let flag = false;
  tasks[currIndex].forEach(t => {

    console.log(t.text === task.text);
    if (t.text === task.text) {

      flag = true;
    }
  });

  if (flag) {
    alert("already in the list")
    return;
  }
  tasks[currIndex].push(task); //adding stuff to the tasks array

  renderList();
}

function deleteTodo(taskId) { //function to delete todo list it will basically delete the items and taskId here is differentiater
  const newTasks = tasks[currIndex].filter(function (task) {//here task.filter will give new array after filtering
    return task.id !== taskId; //get all the task wich not equal to taskId 
  });

  tasks[currIndex] = newTasks;
  renderList();
}
//var li;
function renderList() {
  tasksList.innerHTML = '';
  for (let i = 0; i < tasks[currIndex].length; i++) {
    const li = document.createElement('li');//here we are creating the element using li tag and pushin it to the dom
    const task = tasks[currIndex][i];

    li.innerHTML = `  
     <input type="checkbox" id="${task.id}" class="check" />
     <label for="${task.id}">${task.text}</label>
     <button data-taskId="${task.id}" data-test="test" class="select">Delete</button>

     <br />
     
   `;
    tasksList.appendChild(li);
    li.addEventListener('click', function () {
      li.style.textDecoration = "line-through";
    })

  }

}


let selection = document.querySelector('select');


selection.addEventListener('change', () => {
  currIndex = Number(selection.value);
  renderList();
})


function initialize() {

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const taskid = Number(e.target.dataset.taskid);//grab it in taskid


      deleteTodo(taskid);
    }

  });

  //document.addEventListener('click', handleClick);


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

    addTaskInputBox.value = "";
    //checkTodo();
  }

});


initialize();
