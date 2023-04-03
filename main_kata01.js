//2023/04/03 14:00 - 16:40 (含 localStorage 不含篩選)


window.addEventListener("load",function() {
    const newTaskForm = document.querySelector("#new_task_form");
    const newTaskInput = document.querySelector("#new_task_input");
    const newTaskSubmit = document.querySelector("#new_task_submit");
    const tasksList = document.querySelector("#tasks");

    
    // 提取 localstorage 的資料放進陣列
    const LOCAL_STORAGE_TASK_KEY = "ayuTaskKata01";
    let tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

    // const tasksData = [
    //     {id: 1, value: "todotask01", isDone: false},
    //     {id: 2, value: "todo002", isDone: true}
    // ];
    
    function saveData() {
        JSON.stringify(localStorage.setItem(LOCAL_STORAGE_TASK_KEY, tasksData));
    };
    
    //C"R"UD 讀取資料，進入畫面之後要先讀取 task 資料並產出
    function render() {
        let taskHtml = "";

        tasksData.forEach(function(item) {
            let isDone = item.isDone ? "done" : ""; //如果 isDone 是 true 就 show "done"
            let isChecked = item.isDone ? "checked" : ""; //如果 isDone 是 true 就 "checked" 讓 checkbox 被勾選

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

        tasksList.innerHTML = taskHtml; //將內容存入
    };
    
    render();
    //正常來說，走到這一步的時候不是應該把原本的東西直接覆蓋掉嗎？但是我遇到的問題是它會無限加上？

    //"C"RUD 創建新資料，要先抓到 value
    newTaskForm.addEventListener("submit", function(e) {
        //要讓 submit 送出的預設動作消失，成功了但是 event 被劃掉了??
        event.preventDefault(); 

        // 如果沒有內容就跳提示訊息並不要動作
        if(newTaskInput.value === "") {
            alert("Please type something");
            return;
        }

        // 將輸入的內容存入內容陣列
        tasksData.push({
                "id": Date.now().toString(), //給個不重複的字串做ID
                "value": `${newTaskInput.value}`,
                "isDone": false
            });

        //存完了，將 input 文字清空
        newTaskInput.value = "";

        saveData();
        render();
    });


    tasksList.addEventListener("click", function(e) {
        const taskId = e.target.dataset.index;
        const taskWarp = e.target.parentNode.parentNode;
        const taskText = taskWarp.querySelector(".text");
        const taskIndex = tasksData.findIndex(function(item){
            return item.id === taskId;
        }); // 要找出這個 id 在陣列中的 index 才能針對該資料做修改刪除

        if (e.target.classList.contains("edit")) {
            //CR"U"D 如果點了 edit 按鈕
            if (e.target.innerText.toLowerCase() === "edit"){
                console.log(e.target.innerText);
                e.target.innerText = "save";
                taskText.removeAttribute("readonly"); //將文字方塊變成可編輯
                taskText.focus(); //
                taskText.setSelectionRange(999,999);
                // taskWarp.style
                
                // 如果是 done 的移除，但這個判斷我覺得怪怪的 要重來不然關不回去
                // if (taskWarp.classList.contains("done")){
                //     return taskWarp.classList.remove("done"); 
                // };
            } else if (e.target.innerText.toLowerCase() === "save"){
                e.target.innerText = "edit";
                taskText.setAttribute("readonly","readonly");
                tasksData[taskIndex].value = taskText.value;

                saveData();
                render();
            };
        } else if (e.target.classList.contains("delete")) {
            //CRU"D" 刪除
            tasksData.splice(taskIndex,1);

            saveData();
            render();
        } else if (e.target.classList.contains("do")) {
            //按下 checkbox 如果不是 checked 就加上 done
            if(e.target.checked){
                taskWarp.classList.add("done");
                tasksData[taskIndex].isDone = true;
            } else {
                taskWarp.classList.remove("done");
                tasksData[taskIndex].isDone = false;
            };
            
            saveData();
            render();
        };

    });

});