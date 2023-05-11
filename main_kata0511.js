//2023/05/11 0917-0935(18)

//C"R"UD 0917-0921
const tasksList = document.querySelector("#tasks");

const LOCAL_STORAGE_KEY = "ayu_kata0511";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksData));
};

const saveAndRender = () => {
    saveData();
    let tasksHTML = "";

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
        tasksHTML += taskElement;
    });
    tasksList.innerHTML = tasksHTML;
};

saveAndRender();

//"C"RUD 0921-24
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

    tasksData.push(taskValue);
    saveAndRender();

    newTaskInput.value = "";
});

//CR"UD" 0927-0935
tasksList.addEventListener("click", (e) => {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.id;
    const taskIndex = tasksData.findIndex((item) => {
        return item.id === taskId;
    });
    
    const buttonClass = e.target.classList;
    //0935-37
    if(buttonClass.contains("do")) {
        const doChecked = e.target.checked;

        taskWarp.classList.toggle("done", doChecked);
        tasksData[taskIndex].done = doChecked;

        // if(doChecked) {
        //     taskWarp.classList.add("done");
        //     tasksData[taskIndex].done = true;
        // } else {
        //     taskWarp.classList.remove("done");
        //     tasksData[taskIndex].done = false;
        // };
        saveAndRender();
    };
    //0928-33
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
    //0933-35
    if(buttonClass.contains("delete")) {
        tasksData.splice(taskIndex, 1);
        saveAndRender();
    };

});