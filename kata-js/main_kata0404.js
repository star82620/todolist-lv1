// 2023/04/04 15:00-16:00 (含 localStorage 不含篩選)

const LOCAL_STORAGE_TASK_KEY = "ayuTaskKata0404";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

// const tasksData = [
//     {id:1, value: "todo task1", isDone: false},
//     {id:2, value: "task2", isDone: false},
//     {id:3, value: "nbibibi", isDone: true}
//     ];

const tasksList = document.querySelector("#tasks");
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");


//C"R"UD 讀取頁面
const render = () => {
    let taskHTML = "";
    
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

        taskHTML += taskElement;

    });

    tasksList.innerHTML = taskHTML;
};

render();

const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY,JSON.stringify(tasksData));
};


//"C"RUD
newTaskForm.addEventListener("submit", function(e){
    e.preventDefault();  //不要每次都忘記人家有括號！

    if(newTaskInput.value === "") return alert("Please type something.");
    
    let newTaskValue = {
        id: Date.now().toString(),
        value: newTaskInput.value,
        isDone: false
    };

    tasksData.push(newTaskValue);
    newTaskInput.value = "";

    saveData();
    render();
});

//CR"U"D
tasksList.addEventListener("click", function(e) {
    const taskWrap = e.target.parentNode.parentNode;
    const taskId = e.target.dataset.index;
    const taskIndex = tasksData.findIndex(function(item) {return item.id === taskId;});
    const taskText = taskWrap.querySelector(".text");
    
    if(e.target.classList.contains("edit")) {
        if (e.target.innerText.toLowerCase() === "edit") {
            e.target.innerText = "save";
            taskText.removeAttribute("readonly","readonly");
            taskText.focus();
            taskText.setSelectionRange(999,999);
        } else if(e.target.innerText.toLowerCase() === "save") {
            e.target.innerText = "edit";
            taskText.setAttribute("readonly","readonly");
            
            tasksData[taskIndex].value = taskText.value;
            saveData();
            render();
        };
    } else if (e.target.classList.contains("delete")) {
        tasksData.splice(taskIndex, 1);
        saveData();
        render();
    } else if (e.target.classList.contains("do")) {
        if (e.target.checked) {
            taskWrap.classList.add("done");
            tasksData[taskIndex].isDone = true;
        } else {
            taskWrap.classList.remove("done");
            tasksData[taskIndex].isDone = false;
        };        
        saveData();
        render();
    };
    

});

