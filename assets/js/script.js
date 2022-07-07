var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");


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
    
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    
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
      };
    // event handler for created tasks
    var taskButtonHandler = function(event) {
        console.log(event.target);
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
    


  
  


