var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];

var completeEditTask = function(taskName,taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and tasks object with new content
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].type = taskType;
      }
    };

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};


var taskFormHandler = function() {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    //reset input
    formEl.reset();
    // check if form is being edited
    var isEdit = formEl.hasAttribute("data-task-id");
    

// has data attribute, so get task id and call function to complete edit process
if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };
  
    createTaskEl(taskDataObj);
  }

    
  };

  var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // add div to list
    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl = createTasksActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    // add task id to task object
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    // increase task counter for next unique id
    taskIdCounter++;
    }

    var createTasksActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("Select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);
        
    var statusChoices = ["To do", "In progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++){
        // create option element
        var statusOptionsEl = document.createElement("option");
        statusOptionsEl.textContent = statusChoices[i];
        statusOptionsEl.setAttribute("value", statusChoices[i]);

        // appent to select
        statusSelectEl.appendChild(statusOptionsEl);
    }
    return actionContainerEl;
    };
    
    // edit task function
    var editTask = function(taskId) {
        console.log("editing task #" + taskId);

        // get task list item element
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        // get content from task name and type
        var taskName = taskSelected.querySelector("h3.task-name").textContent;
        var taskType = taskSelected.querySelector("span.task-type").textContent;
        
        // set form to existing task content so it can be edited
        document.querySelector("input[name='task-name']").value = taskName;
        document.querySelector("select[name='task-type']").value = taskType;
        // change button text to save task so user knows they are editing
        document.querySelector("#save-task").textContent = "Save Task";
        // set data-task-id to form so we set new input to existing task
        formEl.setAttribute("data-task-id", taskId);   
    };
    
    // delete task function
    var deleteTask = function(taskId) {
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
        taskSelected.remove();

        // create new array to hold updated list of tasks
        var updatedTaskArr = [];

        // loop through current tasks
        for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
          updatedTaskArr.push(tasks[i]);
        }
      }

// reassign tasks array to be the same as updatedTaskArr
tasks = updatedTaskArr;
      };

    // change status of task
    var taskStatusChangeHandler = function(event) {
         // get the task item's id
        var taskId = event.target.getAttribute("data-task-id");

        // get the currently selected option's value and convert to lowercase
        var statusValue = event.target.value.toLowerCase();

        // find the parent task item element based on the id
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

        if (statusValue === "to do") {
            tasksToDoEl.appendChild(taskSelected);
          } 
          else if (statusValue === "in progress") {
            tasksInProgressEl.appendChild(taskSelected);
          } 
          else if (statusValue === "completed") {
            tasksCompletedEl.appendChild(taskSelected);
          }

          // update tasks in tasks array
          for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === parseInt(taskId)) {
              tasks[i].status = statusValue;
            }
          }
    }

    // event handler for created tasks
    var taskButtonHandler = function(event) {
        var targetEl = event.target;

        if (event.target.matches(".edit-btn")) {
            var taskId = targetEl.getAttribute("data-task-id");
            editTask(taskId);
        }
        if(event.target.matches(".delete-btn")) {
            var taskId = targetEl.getAttribute("data-task-id");
            deleteTask(taskId);
        }

    };
  
pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
    


  
  


