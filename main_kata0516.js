//2023/05/16 0920-0937 (17)

//C"R"UD 0920-0923
const tasksList =  document.querySelector("#tasks");
const LOCAL_STORAGE_KEY = "ayu_kata0516";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksData));
};

const render = () => {
    let taskHTML = "";
    tasksData.forEach((item) => {
        const isDone = item.done ? "done" : "";
        const isChecked = item.done ? "checked" : "";
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
        taskHTML += taskElement;
    });
    tasksList.innerHTML = taskHTML;
};

const saveAndRender = () => {
    saveData();
    render();
};

saveAndRender();

//"C"RUD 0923-26
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");
newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(newTaskInput.value === "") return alert("Please type something.");

    const taskValue = {
        id: Date.now().toString(),
        value: newTaskInput.value,
        done: false
    };

    newTaskInput.value = "";

    tasksData.push(taskValue);
    saveAndRender();
});

//CR"UD" 0929-37
tasksList.addEventListener("click", (e) => {
    const buttonClass = e.target.classList;
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.id;
    const taskIndex = tasksData.findIndex((item) => {
        return item.id === taskId;
    });

    if(buttonClass.contains("do")) {
        const doChecked = e.target.checked;
        taskWarp.classList.toggle("done", doChecked);
        tasksData[taskIndex].done = doChecked;
        saveAndRender();
    };
    if(buttonClass.contains("edit")) {

        if(e.target.innerText.toLowerCase() === "edit") {
            e.target.innerText = "save";
            taskText.removeAttribute("readonly");
            taskText.focus();
            taskText.setSelectionRange(999, 999);
        } else {
            e.target.innerText = "edit";
            taskText.setAttribute("readonly", "readonly");
            tasksData[taskIndex].value = taskText.value;
            saveAndRender();
        };

    };
    if(buttonClass.contains("delete")) {
        tasksData.splice(taskIndex, 1);
        saveAndRender();
    };



});