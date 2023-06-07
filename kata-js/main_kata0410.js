//2023/04/10 22:21-22:41

// const tasksData = [
    //     {id:1, value:"ddd", isDone:false},
    //     {id:2, value:"jythddd", isDone:true},
    //     {id:3, value:"jtttd", isDone:false}
    // ];
    
    const LOCAL_STORAGE_TASK_KEY = "ayuTaskKata0410";
    const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];
    
    const tasksList = document.querySelector("#tasks");
    const newTaskForm = document.querySelector("#new_task_form");
    const newTaskInput = document.querySelector("#new_task_input");

//29-31
const saveData = () => { 
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksData));
};

//CURD 2221-2225
const render = () => {
    let tasksHTML = "";
    tasksData.forEach((item) => {
        const isDone = item.isDone ? "done" : "";
        const isChecked = item.isDone ? "checked" : "";
        const taskElement =
            `<div class="task ${isDone}">
                <div class="check">
                    <input type="checkbox" class="do" data-index="${item.id}" ${isChecked}>
                </div>
                <div class="content">
                    <input type="text" class="text" value="${item.value}" data-index="${item.id}" readonly>
                </div>
                <div class="actions">
                    <button class="edit" data-index="${item.id}">Edit</button>
                    <button class="delete" data-index="${item.id}">Delete</button>
                </div>
            </div>`;

        tasksHTML += taskElement;
    });
    tasksList.innerHTML = tasksHTML;

};

render();

//"C"RUD 2225-2229
newTaskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if(newTaskInput.value ==="") return alert("Please type something");

    const taskValue = {
        id: Date.now().toString(),
        value: newTaskInput.value,
        isDone: false
    };
    
    newTaskInput.value = "";
    tasksData.push(taskValue);
    saveData();
    render();
});

//CR"UD" 2232-2241
tasksList.addEventListener("click", (e) => {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.index;
    const taskIndex = tasksData.findIndex((item) => {
        return item.id = taskId;
    });

    if(e.target.classList.contains("do")) { //38-40
        if(e.target.checked) {
            taskWarp.classList.add("done");
            tasksData[taskIndex].isDone = true;
        } else {
            taskWarp.classList.remove("done");
            tasksData[taskIndex].isDone = false;
        }
        saveData();
        render();
    } else if(e.target.classList.contains("edit")) { //33-38
        if(e.target.innerText.toLowerCase() === "edit") {
            e.target.innerText = "save";
            taskText.removeAttribute("readonly");
            taskText.focus();
            taskText.setSelectionRange(999, 999);
        } else {
            e.target.innerText = "edit";
            taskText.setAttribute("readonly", "readonly");
            tasksData[taskIndex].value = taskText.value;
            saveData();
            render();
        };
    } else if(e.target.classList.contains("delete")) { //38-38
        tasksData.splice(taskIndex, 1);
        saveData();
        render();
    }
});