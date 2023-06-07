// 2023/05/03 15:15
// 這次做的調整：
// 1. 把 saveData 和 render 合併成 saveAndRender，但是這樣名稱要寫好長
// 2. 發現在 edit 裡面的 save 因為有重新 render 的動作，會把 edit 時做的東西改為預設，
//    所以為了美觀做的動作不用特別再寫一次調整回來，這樣不知道有沒有什麼弊端
// 3. 修改寫法一：if(){}else if(){}else{} 改成單個 if(){return}
// 3. 修改寫法二：改寫成 switch


const LOCAL_STORAGE_KEY = "ayukata_0503";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
const saveData = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(tasksData));
};

const tasksList = document.querySelector("#tasks");
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");

//C"R"UD 15:15-15:23
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

// "C"RUD 1523-1533

newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(newTaskInput.value === "") return alert("Please type something");

    const taskValue = {
        id: Date.now().toString(),
        value: newTaskInput.value,
        done: false
    };

    tasksData.push(taskValue);
    saveAndRender();
});

//CR"UD" 1537-0412
tasksList.addEventListener("click", (e) => {
    const taskWarp = e.target.parentNode.parentNode;
    const taskText = taskWarp.querySelector(".text");
    const taskId = e.target.dataset.id;
    const taskIndex = tasksData.findIndex((item) => {return item.id === taskId});


// 嘗試改成用 switch case 的方式寫
    // switch (e.target.classList.value){
    //     case("do"):
    //         console.log("do");
    //         break;
    //     case("edit"):   
    //         console.log("edit");
    //         break;
    //     case("delete"):
    //         console.log("delete");
    //         break;

    // };


    if(e.target.classList.contains("do")) {
        let yesChecked = e.target.checked;
        
        tasksData[taskIndex].done = yesChecked;
        taskWarp.classList.toggle("done", yesChecked);
        
        // if(e.target.checked) {
        //     tasksData[taskIndex].done = true;
        //     taskWarp.classList.add("done");
        // } else {
        //     tasksData[taskIndex].done = false;
        //     taskWarp.classList.remove("done");
        // };
        saveAndRender();
        return;
    };

    // if(e.target.classList.contains("edit")) {
    //     //按下按鈕，抓到按了誰，就作用誰
    //     if(e.target.innerText.toLowerCase() === "edit") {
    //         e.target.innerText = "save";
    //         taskText.removeAttribute("readonly");
    //         taskText.focus();
    //         taskText.setSelectionRange(999, 999);
            
    //         //如果是 done 的狀態，我要編輯時把刪除線拿掉，因為 save 時會重新 render 所以不用加回去沒關係
    //         if(taskWarp.classList.contains("done")) { 
    //             taskWarp.classList.remove("done");
    //             console.log("aa00");
    //             return;
    //         };
    //     } else {
    //         e.target.innerText = "edit";
    //         // taskText.setAttribute("readonly", "readonly"); 
    //         //這行沒寫也沒關係耶？應該是因為會重新render，所以還是會重回唯獨狀態（對，GPT大哥說可以不要）
    //         tasksData[taskIndex].value = taskText.value;
    //         saveAndRender();
    //     };
    //     return;
    // };

    // if(e.target.classList.contains("delete")) {
    //     tasksData.splice(taskIndex, 1);
    //     saveAndRender();
    //     return;
    // };

});