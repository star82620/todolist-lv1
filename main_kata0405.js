// 2023/04/05 12:30 - 13:09

const LOCAL_STORAGE_TASK_KEY = "ayuTaskKata0405";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

// const tasksData = [
//     {id: 1, value: "uuu111", isDone: false },
//     {id: 2, value: "222", isDone: false },
//     {id: 3, value: "333", isDone: true }
// ];

const tasksList = document.querySelector("#tasks");
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");


//C"R"UD 12:26-33
const render = () => {

    let taskHtml = "";

    tasksData.forEach(function(item) {
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

        taskHtml = taskHtml + taskElement;
    });

    tasksList.innerHTML = taskHtml;
};

// 12:41-12:44
const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY,JSON.stringify(tasksData));
};


render();

//"C"RUD 12:33-12:41
newTaskForm.addEventListener("submit", function(e) {
    e.preventDefault(); //每次都忘記括號！

    if(newTaskInput.value ==="") return alert("Please type something");
    
    const newTaskValue = {
        "id": Date.now().toString(), //不要忘記括號！
        "value": newTaskInput.value,
        "isDone": false
    };
    
    tasksData.push(newTaskValue);

    saveData();
    render();
});

//CR"UD" 12:47 - 13:09
tasksList.addEventListener("click", function(e) {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.index;
    const taskIndex = tasksData.findIndex(function(item) {
        return item.id === taskId;
    }); //= ===

    if (e.target.classList.contains("do")) {
        if (e.target.checked) {
            taskWarp.classList.add("done");
            tasksData[taskIndex].isDone = true ;
        } else if (!e.target.checked) {
            taskWarp.classList.remove("done");
            tasksData[taskIndex].isDone = false ;
        };
        saveData();
        render();
    } else if (e.target.classList.contains("edit")) { //13:05
        if(e.target.innerText.toLowerCase() === "edit") {
            e.target.innerText = "save";
            taskText.removeAttribute("readonly");
            taskText.focus();
            taskText.setSelectionRange(999,999);
        } else if(e.target.innerText.toLowerCase() === "save") {
            e.target.innerText = "edit";
            taskText.setAttribute("readonly", "readonly");
            tasksData[taskIndex].value = taskText.value ;
            saveData();
            render();
        };
    
    } else if (e.target.classList.contains("delete")) {
        tasksData.splice(taskIndex,1);
        saveData();
        render();
    };

});