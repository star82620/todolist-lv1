// id 叫什麼，變數就叫什麼
const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");
const taskWrapper = document.querySelector("#task_wrapper");

const LOCAL_STORAGE_TASK_KEY = "ayu.tasks";

// 頁面載入時去 localStorage 撈 tasks
// 若沒有 tasks 則（||） tasks = []（default 值的概念）
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

// 【儲存】
const saveTask = () => {
    // 新增資料後去 localStorage 塞整個 tasks
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasks)); // setItem(key, value)
};

// 【渲染】C"R"UD (read or render)
// 跟畫面、顯示有關的我們習慣用 render（渲染）來命名
// 渲染是整個頁面最基本的邏輯，通常會配合假資料先寫
const render = () => {
    let tasksHTML = "";
    
    // 陣列用複數，裡面的 item 用單數（會比叫 item 好）
    tasks.forEach((task) => {
        const taskElement = `
            <div class="task" >
                <div class="check">
                    <input type="checkbox" class="do" data-id="${task.id}">
                </div>
                <div class="content">
                    <input type="text" class="text" value="${task.value}" readonly>
                </div>
                <div class="actions">
                    <button class="edit" data-id="${task.id}">Edit</button>
                    <button class="delete" data-id="${task.id}">Delete</button>
                </div>
            </div>
        `;
        tasksHTML += taskElement;
    });

    taskWrapper.innerHTML = tasksHTML;
};

// 【新增】"C"RUD
const createTask = (value) => {
    // 定義每一筆的資料格式
    const data = {
        id: Date.now().toString(), // 隨機生成亂數並轉型成字串
        value: value
    };

    tasks.push(data);
};

// 【更新】CR"U"D
const updateTask = (id, value) => {
    // 找出點選的項目是在陣列中的第幾個
    const index = tasks.findIndex((item) => item.id === id);

    tasks[index].value = value;
}
;

// 【刪除】CRU"D"
const deleteTask = (id) => {
    // 找出點選的項目是在陣列中的第幾個
    const index = tasks.findIndex((item) => item.id === id);

    tasks.splice(index, 1);
};

newTaskForm.addEventListener("submit", (e) => {
    // 停止預設行為
    e.preventDefault();

    // 無填寫欄位警告，記得要 return 不然「跳出」 if 繼續往下跑
    if (newTaskInput.value === "") return alert("請輸入文字");

    // 【新增】
    createTask(newTaskInput.value);

    // 【儲存】
    saveTask();

    // 渲染頁面
    render();

    // 清空欄位
    newTaskInput.value = "";
});

taskWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        const taskItem = e.target.parentNode.parentNode;
        const taskContent = taskItem.querySelector(".text");

        if (e.target.innerText.toLowerCase() === "edit") {
            e.target.innerText = "save";
            taskContent.removeAttribute("readonly");
            taskContent.focus();
            taskContent.setSelectionRange(999, 999);
            taskItem.style.backgroundColor = "var(--darker)";
        } else if (e.target.innerText.toLowerCase() === "save") {
            e.target.innerText = "edit";
            taskContent.setAttribute("readonly", "readonly");
            taskItem.style.backgroundColor = "var(--darkest)";

            // 【更新】
            updateTask(e.target.dataset.id, taskContent.value);

            // 【儲存】
            saveTask();
        }
    }

    if (e.target.classList.contains("delete")) {
        // 【刪除】
        deleteTask(e.target.dataset.id);

        // 【儲存】
        saveTask();

        // 渲染頁面
        render();
    }
})

render();