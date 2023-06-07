//2023/05/09 0915-0958


//C"R"UD 0915-0923
// const tasksData = [
//     {id:1, value: "A", isDone: false},
//     {id:2, value: "B", isDone: true}
// ];

const LOCAL_STORAGE_KEY = "ayukata0509";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(tasksData));
};


const tasksList = document.querySelector("#tasks");

const saveAndRender = () => {
    saveData();

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

saveAndRender();

//"C"RUD 0923-0928
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(newTaskInput.value === "") return alert("Please type something.");

    const taskValue = {
        id: Date.now().toString(),
        value: newTaskInput.value,
        isDone: false,
    };
    newTaskInput.value = "";
    tasksData.push(taskValue);
    saveAndRender();
});

//CR"UD" 0936-0958
tasksList.addEventListener("click", (e) => {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.id;
    const taskIndex = tasksData.findIndex((item) => {
        return item.id = taskId;
    });

    // console.log(taskIndex);
    
    if(e.target.classList.contains("do")) {
        const doChecked = e.target.checked;


        if(doChecked) {
            taskWarp.classList.add("done");
            tasksData[taskIndex].isDone = true;
        } else {
            taskWarp.classList.remove("done");
            tasksData[taskIndex].isDone = false;
        } ;
        saveAndRender();
    };
    if(e.target.classList.contains("edit")) { //-0952
        const editText = e.target.innerText.toLowerCase();
        if(editText === "edit") {
            e.target.innerText = "save";
            taskText.removeAttribute("readonly");
            taskText.focus();
            taskText.setSelectionRange(999, 999);
        };
        if(editText === "save") {
            e.target.innerText = "edit";
            taskText.setAttribute("readonly", "readonly");
            tasksData[taskIndex].value = taskText.value;
            saveAndRender();
        };
    };

    if(e.target.classList.contains("delete")) { //-0952
        tasksData.splice(taskIndex, 1);
        saveAndRender();
    };

});