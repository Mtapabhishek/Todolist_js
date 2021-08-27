let tasks = [];  //Array of task
let currentTaskIndex = 0;
let currentTask=[]


const tasksList = document.getElementById("list");  //grab the list
const addTaskInputBox = document.getElementById("Add-task"); //we have to select the input box with id add-task

function addTodo(task) {  //function to add todo list

  let flag = false;
  tasks.forEach(t => {

    console.log(t.text === task.text);
    if (t.text === task.text) {

      flag = true;
    }
  });

  if (flag) {
    alert("already in the list")
    return;
  }
  tasks.push(task); //adding stuff to the tasks array

  renderList();
}

function deleteTodo(taskId) { //function to delete todo list it will basically delete the items and taskId here is differentiater
  const newTasks = tasks.filter(function (task) {//here task.filter will give new array after filtering
    return task.id !== taskId; //get all the task wich not equal to taskId 
  });

  tasks = newTasks;
  renderList();
}
//var li;
function renderList() {
  tasksList.innerHTML = '';
  currentTask=tasks.filter(t=>t.type===currentTaskIndex)
  for (let i = 0; i < currentTask.length; i++) {
    const li = document.createElement('li');//here we are creating the element using li tag and pushin it to the dom
    const task = currentTask[i];

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


var selection = document.querySelector('select');
  var options=["Personal","Official","Market", "Hospital"];

 
  for(var i=0;i<options.length; i++) {
    var opt =options[i];
    var el=document.createElement("option");
    el.textContent =opt;
    el.value =i;
    selection.appendChild(el)
    
    //renderList()
  }
  
  selection.addEventListener('change', () => {
     
    currentTaskIndex = Number(selection.value);
    
    //console.log(currentTask);
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
      done: false,
      type:currentTaskIndex 
    }
    addTodo(task);
    renderList();
    addTaskInputBox.value = "";
    
  }

});


initialize();
