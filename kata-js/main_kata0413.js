//20230413 10:40-10:57 (17)

// const tasksData = [
//     {id:1, value:"ddd", isDone:false},
//     {id:2, value:"adawdaddd", isDone:true}

// ]

const tasksList = document.querySelector("#tasks");
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");

//47-49
const LOCAL_STORAGE_TASK_KEY = "ayuTaskKata0413";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];
const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksData));
};


//C"R"UD 40-44
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


//"C"RUD 44-47
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

//CR"UD" 49-57

tasksList.addEventListener("click", (e) => {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.id;
    const taskIndex = tasksData.findIndex((item) => item.id === taskId);

    if(e.target.classList.contains("do")){ //55-57
        if(e.target.checked) {
            tasksData[taskIndex].isDone = true;
            taskWarp.classList.add("done");
            
        } else {
            tasksData[taskIndex].isDone = false;
            taskWarp.classList.remove("done");
        };
        saveData();
        render();
    } else if (e.target.classList.contains("edit")) { //50-55
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
        
    } else if (e.target.classList.contains("delete")) { //55-55
        tasksData.splice(taskIndex, 1);
        saveData();
        render();
    };

});