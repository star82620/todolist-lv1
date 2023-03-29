window.addEventListener("load", () => {
    const form = document.querySelector("#new_task_form");
    const input = document.querySelector("#new_task_input");
    const list_el = document.querySelector("#tasks");
    
    //task 內容陣列 => 之後的 local storage
    let tasksData = [
        { value: "edit to-do list" }, 
        { value: "heheheh" },
        { value: "HBD" }
    ];
    
    // 新增一組 task 的結構 
    const buildTaskList = (data) => {
        let tasksList = ""; //全部 task 的 HTML
        data.forEach(function(item, index) {      
            const taskValue = `
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
            tasksList+=taskValue;
            // tasksList = tasksList + taskComp;
        });
        list_el.innerHTML =  tasksList; //全部再一起插入
    };
    
    buildTaskList(tasksData);
    
    //----新增 task
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        if (input.value === "") {
            alert("請輸入文字");
            return;
        };

        tasksData.push({value: `${input.value}`});
        buildTaskList(tasksData);

        input.value = "";
    });


    list_el.addEventListener("click", function(e) {
        const taskBox = e.target.parentNode.parentNode;
        const taskContent = taskBox.querySelector(".text");
        const taskDo = taskBox.querySelector(".do");
        
        if(e.target.classList.contains("do")) {
            console.log(e.target.checked);
            if(e.target.checked) {
                taskContent.classList.add("done");
                console.log("hit checked");
            } else {
                taskContent.classList.remove("done");
            }
        };

        if(e.target.classList.contains("edit")){
            console.log("id: "+e.target.dataset.id);

            if(e.target.innerText.toLowerCase() === "edit"){
                console.log("is edit"+"id: "+e.target.dataset.id);
                e.target.innerText = "save";
                taskContent.removeAttribute("readonly");
                taskContent.focus();
                taskContent.setSelectionRange(999, 999);
                taskBox.style.backgroundColor = "var(--darker)";
                taskDo.style.visibility = "hidden";
            } else if (e.target.innerText.toLowerCase() === "save") {
                console.log("is save"+"id: "+e.target.dataset.id);
                e.target.innerText = "edit";
                taskContent.setAttribute("readonly","readonly");
                taskBox.style.backgroundColor = "var(--darkest)";
                taskDo.style.visibility = "visible";
                tasksData[e.target.dataset.id].value = taskContent.value;
                // buildTaskList(tasksData); //是這傢伙有問題！
            };

            return;
        };

        if(e.target.innerText.toLowerCase() === "delete"){
            tasksData.splice(e.target.dataset.id, 1);
            buildTaskList(tasksData);
            console.log(tasksData);
            console.log("delete");
            
        };


    });

});