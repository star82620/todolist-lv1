//2023/04/14 11:16-11:32

// const tasksData = [
    //     {id:1, value:"do", isDone: false},
    //     {id:2, value:"do", isDone: true}
    // ];
    
const tasksList = document.querySelector("#tasks");
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");

const LOCAL_STORAGE_KEY = "ayuYaskKata0414";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const saveData = () => { //23-25
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(tasksData));
};

//C"R"UD 15-18
const render = () => {
    let tasksHTML = "";
    tasksData.forEach((item) => {
        const isDone = item.isDone ? "done" : "";
        const isChecked = item.isDone ? "checked" : "";
        const taskElement =
            `<div class="task ${isDone}">
                <div class="check">
                    <input type="checkbox" class="do" data-id="${item.id}" ${isChecked}>
                </div>
                <div class="content">
                    <input type="text" class="text" value="${item.value}" data-id="${item.id}" readonly>
                </div>
                <div class="actions">
                    <button class="edit" data-id="${item.id}">Edit</button>
                    <button class="delete" data-id="${item.id}">Delete</button>
                </div>
            </div>`;

        tasksHTML += taskElement;
    });
    tasksList.innerHTML = tasksHTML;
};

render();

//"C"RUD 19-23

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
    newTaskInput.value = "";
});

//CR"UD" 25-32

tasksList.addEventListener("click", (e) => {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.id;
    const taskIndex = tasksData.findIndex((item) => item.id === taskId);

    if(e.target.classList.contains("do")) {//31-32
        if(e.target.checked) {
            tasksData[taskIndex].isDone = true;
            taskWarp.classList.add("done");
        } else {
            tasksData[taskIndex].isDone = false;
            taskWarp.classList.remove("done");
        };
        saveData();
        render();
    } else if(e.target.classList.contains("edit")) { //26-30
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
    } else if(e.target.classList.contains("delete")) {
        tasksData.splice(taskIndex, 1);
        saveData();
        render();
    };
});