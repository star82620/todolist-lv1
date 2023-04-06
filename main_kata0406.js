// 2023/04/06 13:35-14:05

// const tasksData = [
//     {id: 1, value: "todo1", isDone: false},
//     {id: 2, value: "to222", isDone: false},
// ]
const LOCAL_STORAGE_TASK_KEY = "ayuTaskKata0406";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

const tasksList = document.querySelector("#tasks");
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");


// C"R"UD 13:35-13:40
const render = () => {
    let taskHtml = "";
    tasksData.forEach(function(item){
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

            taskHtml += taskElement;
    });

    tasksList.innerHTML = taskHtml;
};

// 13:44 - 13:46
const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksData));
};


render();

// "C"RUD 13:40-13:44
newTaskForm.addEventListener("submit", function(e){
    e.preventDefault();

    if(newTaskInput.value === "") return alert("Please type something.");

    const newTaskValue =
    {   id: Date.now().toString(),
        value: newTaskInput.value,
        isDone: false
    };

    tasksData.push(newTaskValue);

    saveData();
    render();

});

//CR"UD" 13:47-14:05
tasksList.addEventListener("click", function(e) {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.index;
    const taskIndex = tasksData.findIndex(function(item) {
        return item.id === taskId;
    })

    if(e.target.classList.contains("edit")) {  //13:47-14:00
        if (e.target.innerText.toLowerCase() === "edit"){
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
    } else if(e.target.classList.contains("delete")) { //1400-1401
        tasksData.splice(taskIndex, 1);
        saveData();
        render();
    } else if(e.target.classList.contains("do")) { //done??? 1401-1404
        if (e.target.checked) {
            tasksData[taskIndex].isDone = true;
            taskWarp.classList.add("done");
        } else {
            tasksData[taskIndex].isDone = false;
            taskWarp.classList.remove("done");
        };
        saveData();
        render();
    };
});