window.addEventListener("load", () => {
    const newTaskForm = document.querySelector("#new_task_form");
    const newTaskInput = document.querySelector("#new_task_input");
    const list_el = document.querySelector("#tasks");
    const filterButton = document.querySelector(".filter"); 
    
    const LOCAL_STORAGE_TASK_KEY = "ayuTask";
    //task 內容陣列 => 之後的 local storage
    const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

    // 將陣列解構複製進新的變數
    let filter = [...tasksData]; 


    //篩選項目
    filterButton.addEventListener("click", function(e) {
            console.log(e.target.siblings());
            e.target.classList.add("activating");   


        filter = tasksData.filter(function(item){
            if (e.target.classList.contains("all")) {
                // 按了 all 全部按鈕，回傳所有的 item 作為篩選的條件
                
                return item;
            } else if (e.target.classList.contains("progress")) {
                // 按了 progress 進行中按鈕，回傳 isDone 是 false 的項目
                // e.target.siblings.classList.remove("activating");
                // e.target.classList.add("activating");
                return !item.isDone;
            } else if (e.target.classList.contains("done")) {
                // 按了 done 已完成按鈕，回傳 isDone 是 true 的項目
                // e.target.siblings.classList.remove("activating");
                // e.target.classList.add("activating");
                return item.isDone;
            } else {
                // 最後一個預設狀況就是回傳全部
                // e.target.classList.add("activating");
                return item;
            };
        });    
        
        render();
    });


    //如果 filter 獨立出來，不要用點擊作為觸發點，而是去偵測現在畫面上是哪個篩選狀態呢？
    //如果狀態是 all 就回傳 item
    // filter = tasksData.filter(function(item){
    //     if (e.target.classList.contains("all")) {
    //         // 按了 all 全部按鈕，回傳所有的 item 作為篩選的條件
    //             return item;
    //     } else if (e.target.classList.contains("progress")) {
    //         // 按了 progress 進行中按鈕，回傳 isDone 是 false 的項目
    //             return !item.isDone;
    //     } else if (e.target.classList.contains("done")) {
    //         // 按了 done 已完成按鈕，回傳 isDone 是 true 的項目
    //             return item.isDone;
    //     } else {
    //         // 最後一個預設狀況就是回傳全部
    //             return item;
    //     }
    // });   


    //filter 是專門用來渲染的陣列
    //最主要的 localStorage 還是要用 tasksData
    //每一次渲染都要跑一次 filter
    //render 裡面有用到 filter 去跑 forEach
    //

    // C"R"UD 讀取生成所有 task 結構 
    const render = () => {
        let taskHTML = ""; //全部 task 的 HTML

        filter.forEach(function(item) {      
            let isChecked = item.isDone ? "checked" : "";
            let isDone = item.isDone ? "done" : "";
            
            const taskElement = `
                <div class="task ${isDone}">
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
            taskHTML+=taskElement;
            // taskHTML = taskHTML + taskComp;
            
        });
        list_el.innerHTML =  taskHTML; //全部再一起插入
        console.log("我讀了！");
    };

    // 將資料轉變成 JSON 格式並傳給 localStorage
    const saveData = () => {
        localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksData));
    };


    render();
    
    //----新增 task
    newTaskForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        if (newTaskInput.value === "") return alert("請輸入文字");

        const newTaskValue = {
            id: Date.now().toString(), 
            value: `${newTaskInput.value}`,
            isDone: false //每一筆新的都預設未完成
        };

        // 因為要讓 taskData 和 filter 資料同步，所以用兩個都增加的方式折衷
        tasksData.push(newTaskValue);
        filter.push(newTaskValue);

        saveData();
        render();

        newTaskInput.value = "";
    });


    list_el.addEventListener("click", function(e) {
        const taskBox = e.target.parentNode.parentNode;
        const taskContent = taskBox.querySelector(".text");
        const taskDo = taskBox.querySelector(".do");
        const dataId = e.target.dataset.index;
        let taskIndex = tasksData.findIndex(function(item){
            return item.id === dataId;
        });

        //switch case 寫寫寫

        switch (e.target.classList.value) {
            case "do":
                if(e.target.checked) { 
                    taskBox.classList.add("done");
                    tasksData[taskIndex].isDone = true;
                    console.log(tasksData[taskIndex]);
                    saveData();
                    render();
                } else {
                    taskBox.classList.remove("done");
                    tasksData[taskIndex].isDone = false;
                    saveData();
                    render();
                }
                console.log("1818");
                break;
            case "edit":
                if(e.target.innerText.toLowerCase() === "edit"){
                    e.target.innerText = "save";
                    taskContent.removeAttribute("readonly");
                    taskContent.focus();
                    taskContent.setSelectionRange(999, 999);
                    taskBox.style.backgroundColor = "var(--darker)";
                    taskDo.style.visibility = "hidden";
                } else if (e.target.innerText.toLowerCase() === "save") {
                    e.target.innerText = "edit";
                    taskContent.setAttribute("readonly","readonly");
                    taskBox.style.backgroundColor = "var(--darkest)";
                    taskDo.style.visibility = "visible";
    
                    tasksData[taskIndex].value = taskContent.value;
                    saveData();
                    render();
                };
                break;
            case "delete":
                tasksData.splice(taskIndex, 1);
                filter.splice(taskIndex, 1);
                saveData();
                render();
                break;
        };




        // if(e.target.classList.contains("do")) {
        //     if(e.target.checked) { 
        //         taskBox.classList.add("done");
        //         tasksData[taskIndex].isDone = true;
        //         console.log(tasksData.dataId);
        //         saveData();
        //     } else {
        //         taskBox.classList.remove("done");
        //         tasksData[taskIndex].isDone = false;       
        //         saveData();
        //     }
        // };

        // if(e.target.classList.contains("edit")){

        //     if(e.target.innerText.toLowerCase() === "edit"){
        //         e.target.innerText = "save";
        //         taskContent.removeAttribute("readonly");
        //         taskContent.focus();
        //         taskContent.setSelectionRange(999, 999);
        //         taskBox.style.backgroundColor = "var(--darker)";
        //         taskDo.style.visibility = "hidden";
        //     } else if (e.target.innerText.toLowerCase() === "save") {
        //         e.target.innerText = "edit";
        //         taskContent.setAttribute("readonly","readonly");
        //         taskBox.style.backgroundColor = "var(--darkest)";
        //         taskDo.style.visibility = "visible";

        //         tasksData[taskIndex].value = taskContent.value;
        //         saveData();
        //         render();
        //     };

        // };

        // 要找出，我現在點擊的這個 button 的 dataId 是什麼
        // 要找出這個 dataId 在 tasksdata 陣列中的位置

    //     if(e.target.classList.contains("delete")){
    //         tasksData.splice(taskIndex, 1);
    //         filter.splice(taskIndex, 1);
    //         saveData();
    //         render();            
    //     };
    });



});