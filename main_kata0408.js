// 20230408 1202-1223

// const tasksData = [
//     {id:1, value:"to", isDone:true},
//     {id:2, value:"to2", isDone:false},
//     {id:3, value:"3", isDone:false}
// ];

const LOCAL_STORAGE_TASK_KEY = "ayuTaskKata0408";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];
const tasksList = document.querySelector("#tasks");


//C"R"UD 1201-1206
const render = () => {
    let taskHTML = "";

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

        taskHTML += taskElement;
    });

    tasksList.innerHTML = taskHTML;
};

const saveData = ()=> { //1213
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksData));
};


render();

//"C"RUD 1207-1210
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(newTaskInput.value === "") return alert("Please type something");

    const taskValue = {
        id: Date.now().toString(),
        value: newTaskInput.value,
        isDone: false
    };

    tasksData.push(taskValue);

    saveData();
    render();
});

//CR"UD"
tasksList.addEventListener("click", (e) => {
    const taskWarp = e.target.parentNode.parentNode; 
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.index;
    const taskIndex = tasksData.findIndex((item) => {return item.id === taskId;});

    if(e.target.classList.contains("do")) { //1221-1223
        if(e.target.checked) {
            taskWarp.classList.add("done");
            tasksData[taskIndex].isDone = true;
        } else {
            taskWarp.classList.remove("done");
            tasksData[taskIndex].isDone = false;
        }

        saveData();
        render();        
    } else if(e.target.classList.contains("edit")) {
         //1215-1221

        if(e.target.innerText.toLowerCase() === "edit"){
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

    } else if(e.target.classList.contains("delete")) { //1221-1221
        tasksData.splice(taskIndex, 1);

        saveData();
        render();
    };
});