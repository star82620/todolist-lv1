//20230405 1500-1540
//今天的問題是在 render 時的三元判斷寫錯了所以到 do 的地方有問題

//C"R"UD

// const tasksData = [
//     {id: 1, value: "to", isDone: false},
//     {id: 2, value: "t2222o", isDone: false},
//     {id: 3, value: "t3333o", isDone: true},
// ];

const LOCAL_STORAGE_TASK_KEY = "ayuTaskKata0407";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];


const tasksList = document.querySelector("#tasks");

const render = () => { 
    let tasksHTML = "";
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
        
        tasksHTML = tasksHTML + taskElement;
    });

    tasksList.innerHTML = tasksHTML;

    console.log(tasksHTML);
};

//1512-1514
const saveData = () => { 
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY,JSON.stringify(tasksData));
}

render();

//"C"RUD 1508-1512
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");

newTaskForm.addEventListener("submit", function(e){
    e.preventDefault();

    if(newTaskInput.value === "") return alert("Please type something");

    let taskValue = {
        id: Date.now().toString(),
        value: newTaskInput.value,
        isDone: false
    };

    tasksData.push(taskValue);

    saveData();
    render();

});

//CR"UD" 1514-1540

tasksList.addEventListener("click", function(e){
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.index;
    const taskIndex = tasksData.findIndex(function(item) {
        return item.id === taskId; });

        
        //1525
    if(e.target.classList.contains("edit")) {
        if(e.target.innerText.toLowerCase() ==="edit"){
            e.target.innerText = "save";
            taskText.removeAttribute("readonly");
            taskText.focus();
            taskText.setSelectionRange(999, 999);
            console.log(taskIndex);
            
        } else {
            e.target.innerText = "save";
            taskText.setAttribute("readonly", "readonly");
            tasksData[taskIndex] = taskText.value;
            saveData();
            render();
        };

    //1525-26
    } else if(e.target.classList.contains("delete")) {
        tasksData.splice(taskIndex, 1);
        saveData();
        render();

    //1526-1540
    } else if(e.target.classList.contains("do")) {
        if(e.target.checked) {
            tasksData[taskIndex].isDone = true;
            taskWarp.classList.add("done");
        } else {
            tasksData[taskIndex].isDone = false;
            taskWarp.classList.remove("done");
            console.log(taskWarp);
        };
        saveData();
        render();
    }
});