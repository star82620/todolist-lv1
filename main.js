window.addEventListener("load", () => {
    const form = document.querySelector("#new_task_form");
    const input = document.querySelector("#new_task_input");
    const list_el = document.querySelector("#tasks");
    const list_doing_el = document.querySelector(".filter .doing");
    const list_done_el = document.querySelector(".filter .done");
    const list_all_el = document.querySelector(".filter .all");
    
    let task;
    
    // 因為他們都要用到新增 task 的動作所以把這些移出來變成一個 function：
    //-----
    function createTask() {
        // 創建一個 div 並給這個 div: class="task"
        const task_el = document.createElement("div");
        task_el.classList.add("task","taskValue");
        
        // 創建一個 div 並給這個 div: class="task"，"並加入 task 變數中的值????"
        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
        // task_content_el.innerTEXT = task ;
        task_el.appendChild(task_content_el);


        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        // 可以直接 task_input_el.value = task;
        // 可以直接 task_input_el.type = "text";
        task_input_el.setAttribute("type","text");
        task_input_el.setAttribute("readonly","readonly");
        // 在 HTML 裡看起來只有 readonly 其實有屬性名稱是 readonly

        task_content_el.appendChild(task_input_el);

        // 增加 actions 按鈕
        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");    
                
        const task_do_el = document.createElement("input");
        task_do_el.type = "checkbox";
        task_do_el.classList.add("do");
        
        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerText = "edit" ;
        
        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "delete" ;
        
        task_el.appendChild(task_actions_el);
        task_actions_el.appendChild(task_do_el);
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        
        // 把整組 task 加入 task list 中
        // 加入的順序沒有影響，一樣可以動作
        list_el.appendChild(task_el);

        let editTime = 1;
        
        task_el.classList.add(editTime);

        
        // actions 按鈕的動作
        task_do_el.addEventListener("change", function() {
            task_el.classList.add("done");
            console.log("done!");
        });
        task_edit_el.addEventListener("click", function() {
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                // 移除唯獨狀態，讓 input 可以編輯
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerHTML = "save";
                task_el.style.backgroundColor = "var(--darker)";
            } else {
                task_input_el.setAttribute("readonly", "readonly") ;
                task_edit_el.innerHTML = "edit";
                task_el.style.backgroundColor = "var(--darkest)";
            }
        });
        task_delete_el.addEventListener("click", function() {
            task_el.remove();
            // list_el.removeChild(task_el);
            // 這兩行的作用應該是一樣的？
        });
    };
    //-----------



    

    const taskList = document.querySelectorAll(".task");
    list_doing_el.addEventListener("click", function() {
        //如果是 done/已完成的項目就隱藏
        // if (task_el.classList.contains("done")){
        //     task_el.style.display = "none";
        // }
        console.log("doing");
    });

    list_done_el.addEventListener("click", function() {
        //如果是 done/已完成的項目就隱藏
        if (!task_el.classList.contains("done")){
            task_el.style.display = "none";
        }
    });

    list_all_el.addEventListener("click", function() {
            task_el.style.display = "flex";
    });

    //-----------
    // 進入網站時就要讀取有沒有紀錄，有紀錄就把他們讀取出來變成一組 task，沒有就不動
    // const storage = localStorage.getItem("taskValue");
    // if (storage) {
    //     console.log(storage);
    //     // task = storage;
    //     // task_input_el.value = task;
    //     // list_el.appendChild(task_el);
    // } else {
    //     return;
    // }
    

    //-----------
    // 按下 new task submit 的動作
    form.addEventListener("submit", function(e) {
        // 取消 form submit 本身的 DOM 動作
        e.preventDefault();

        // input #new_task_input 的 value 屬性的值
        task = input.value;
        
        // 如果 task 裡面沒有 value 的話就跳提示訊息，並且停止往下動作
        if (!task) {
            alert("Please add task content");
            return;
        } 

        // 將 task value 存入本地暫存空間
        // localStorage.setItem("taskValue", task);
        // 把整組 task 加入 task list 中
        createTask();
        const taskWarp = document.querySelector(".taskValue");
        const taskInput = document.querySelector(".taskValue .text");
        taskWarp.classList.remove("taskValue");
        taskWarp.classList.add(task);
        taskInput.value = task;
        console.log(taskInput);

        //因為跑完上面的增加節點動作之後，new_task_input 裡面的值還在，所以要清空它
        input.value = "";


    });
    
});