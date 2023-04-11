//2023/04/11 22:15-22:32

// const tasksData = [
//     {id:1, value:"ppp", isDone:false},
//     {id:2, value:"ppp", isDone:true},
//     {id:3, value:"ppp", isDone:false}
// ];

const LOCAL_STORAGE_TASK_KEY = "ayuTaskKata0411";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];
const saveData = () => { //22-24
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksData));
};

const tasksList = document.querySelector("#tasks");
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");

//C"R"UD 1016-19
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

//"C"RUD 19-22
newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(newTaskInput.value === "")return alert("Please type something.");
    const taskValue = {
        id: Date.now().toString(),
        value: newTaskInput.value,
        isDone: false,
    };

    tasksData.push(taskValue);
    saveData();
    render();
});


//CR"UD"24-32
tasksList.addEventListener("click", (e) => {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.index;
    const taskIndex = tasksData.findIndex((item) => {
        return item.id = taskId ;
    });

    if(e.target.classList.contains("do")) { //31-32
        if(e.target.checked) {
            tasksData[taskIndex].isDone = true;
            taskWarp.classList.add("done");
        } else {
            tasksData[taskIndex].isDone = false;
            taskWarp.classList.remove("done");
        };
        saveData();
        render();
    } else if(e.target.classList.contains("edit")) { //25-28-30
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
    } else if(e.target.classList.contains("delete")) { //30-31
        tasksData.splice(taskIndex, 1);
        saveData();
        render();
    };
});