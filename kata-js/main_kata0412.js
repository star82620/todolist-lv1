//2023/04/12 1505-1522

// const tasksData = [
//     {id:1, value:"A", isDone:false},
//     {id:2, value:"A", isDone:false},
// ];

const LOCAL_STORAGE_KEY = "ayuTaskKata0412";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const tasksList = document.querySelector("#tasks");

//13-14
const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(tasksData));
};

//C"R"UD 1505-09
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


//"C"RUD 09-11
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

    newTaskInput.value = "";
});


//CR"UD" 14-22
tasksList.addEventListener("click", (e) => {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.id;
    const taskIndex = tasksData.findIndex((item)=>item.id === taskId);

    if(e.target.classList.contains("do")){ //20-22
        if(e.target.checked) {
            tasksData[taskIndex].isDone = true;
            taskWarp.classList.add("done");
        } else {
            tasksData[taskIndex].isDone = false;
            taskWarp.classList.remove("done");
        }
        saveData();
        render();
    } else if(e.target.classList.contains("edit")){ //15-20
        if(e.target.innerText.toLowerCase() ==="edit") {
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
        }
    } else if(e.target.classList.contains("delete")){ //20-20
        tasksData.splice(taskIndex, 1);
        saveData();
        render();
    };

});