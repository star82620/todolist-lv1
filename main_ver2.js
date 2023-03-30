window.addEventListener("load", () => {
    const newTaskForm = document.querySelector("#new_task_form");
    const newTaskInput = document.querySelector("#new_task_input");
    const list_el = document.querySelector("#tasks");
    
    const LOCAL_STORAGE_TASK_KEY = "ayuTask";
    //task 內容陣列 => 之後的 local storage
    // const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];
    const tasksData =[
        {id:1, value: "todolist"},
        {id:2, value: "bibibib"},
        {id:3, value: "HEHEHE"}];

    console.log(tasksData);
    // 讀取生成所有 task 結構 
    const render = () => {
        let taskHTML = ""; //全部 task 的 HTML

        tasksData.forEach(function(item, index) {      
            const taskElement = `
                <div class="task">
                    <div class="check">
                        <input type="checkbox" class="do">
                    </div>
                    <div class="content">
                        <input type="text" class="text" value="${item.value}" data-id="${index}" readonly>
                    </div>
                    <div class="actions">
                        <button class="edit" data-id="${index}">Edit</button>
                        <button class="delete" data-id="${index}">Delete</button>
                    </div>
                </div>`;
            taskHTML+=taskElement;
            // taskHTML = taskHTML + taskComp;
        });
        list_el.innerHTML =  taskHTML; //全部再一起插入
    };

    // 將資料轉變成 JSON 格式並傳給 localStorage
    const saveData = () => {
        // localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksData));
    };


    
    render();
    
    //----新增 task
    newTaskForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        if (newTaskInput.value === "") {
            alert("請輸入文字");
            return;
        };

        tasksData.push({
            id: Date.now().toString(), 
            value: `${newTaskInput.value}`,
            done: ""
            });

        saveData();
        render();

        newTaskInput.value = "";
    });


    list_el.addEventListener("click", function(e) {
        const taskBox = e.target.parentNode.parentNode;
        const taskContent = taskBox.querySelector(".text");
        const taskDo = taskBox.querySelector(".do");
        
        if(e.target.classList.contains("do")) {
            

            if(e.target.checked) {
                taskContent.classList.add("done");
            } else {
                taskContent.classList.remove("done");
            }
        };

        if(e.target.classList.contains("edit")){

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

                tasksData[e.target.dataset.id].value = taskContent.value;
                saveData();
                render();
            };

        };

        if(e.target.innerText.toLowerCase() === "delete"){
            tasksData.splice(e.target.dataset.id, 1);

            saveData();
            render();            
        };


    });

});