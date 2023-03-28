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
    const bulidTaskList = (data) => {
        let tasksList = ""; //全部 task 的 HTML
        data.forEach(function(item, index) {      
            const taskValue = `
                <div class="task">
                    <div class="check">
                        <input type="checkbox" class="do">
                    </div>
                    <div class="content">
                        <input type="text" class="text" value="${item.value}" readonly>
                    </div>
                    <div class="actions">
                        <button class="edit">Edit</button>
                        <button class="delete" data-id="${index}">Delete</button>
                    </div>
                </div>`;
            tasksList+=taskValue;
            // tasksList = tasksList + taskComp;
        });
        return tasksList;
    };
    
    const showTask = (list) => {
        list_el.innerHTML = list; //全部再一起插入
        // console.log(tasksList);
    }

    // console.log(bulidTaskList(tasksData));
    showTask(bulidTaskList(tasksData));
    
    //----新增 task
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        if (input.value === "") {
            alert("請輸入文字");
        };

        tasksData[tasksData.length] = {value: `${input.value}`};
        
        showTask(bulidTaskList(tasksData));
        input.value = "";

        console.log(tasksData);
    });
    // taskComp(value) 是 html 內容
    // showTask() 是 執行讀取陣列 taskData 資料並 innerHTML
    // 要增加新的一筆時有兩個做法
    //   1. 把新的一筆 taskComp(input.value) 加進 lise_el 裡面原本的東西下面
    //   2. 先把 input.value 寫進 taskData，再執行 showTask()，讓整個頁面重新跑一次。

    const editButtons = document.querySelectorAll(".edit");
    const deleteButtons = document.querySelectorAll(".delete");
    const doButtons = document.querySelectorAll(".do");
    const taskContents = document.querySelectorAll(".text");
    const taskBoxes = document.querySelectorAll(".task");

    list_el.addEventListener("click", function(e) {
        //這個地方是父層 tasks
        //但這個 target 是被點擊到的子元素
        let eventTarget = e.target; 

        if(eventTarget.classList.contains("edit")){

            console.log(eventTarget.innerText);

            if (eventTarget.innerText.toLowerCase() === "edit") {
                // eventTarget.removeAttribute("readonly");
                // taskContent.setSelectionRange(999,999);
                // taskContent.focus();
                eventTarget.innerText = "save";
                // taskBox.style.backgroundColor = "var(--darker)";
            } else {
                console.log("巴巴");
                // taskContent.setAttribute("readonly","readonly");
                eventTarget.innerText = "edit";
                // taskBox.style.backgroundColor = "var(--darkest)";           
                // tasksData[index].value = taskContent.value;
                // showTask(bulidTaskList(tasksData));
            }

        } 
        
        if(e.target.classList.contains("delete")){


        }


    });


    // editButtons.forEach(function(editButton, index) {
    //     editButton.addEventListener("click", function() {
    //         const taskContent = taskContents[index];
    //         const taskBox = taskBoxes[index];

    //         if (editButton.innerText.toLowerCase() === "edit") {
    //             taskContent.removeAttribute("readonly");
    //             taskContent.setSelectionRange(999,999);
    //             taskContent.focus();
    //             editButton.innerText = "save";
    //             taskBox.style.backgroundColor = "var(--darker)";
    //         } else {
    //             taskContent.setAttribute("readonly","readonly");
    //             editButton.innerText = "edit";
    //             taskBox.style.backgroundColor = "var(--darkest)";           
    //             tasksData[index].value = taskContent.value;
    //             showTask(bulidTaskList(tasksData));
    //         }
    //         console.log("haha");
    //     });
    //     console.log("編輯");
    // });

    // deleteButtons.forEach(function(deleteButton, index){
        
    //     // 刪除按鈕的動作，不使用 remove 而是直接將陣列中的內容刪除再重新渲染
    //     deleteButton.addEventListener("click", function(e){
    //         tasksData.splice(index, 1);
    //         showTask(bulidTaskList(tasksData));

    //         console.log(tasksData);
    //     });
    //     console.log("刪除");
    // });

}); 


// 是不是用 forEach 的關係？edit 和 delete 的第一個動作可以，但是後面就不會動了
// 連console.log 都沒有，代表是沒有作用的
// 是不是要修改一下，讓按鈕按下去的事件放在外面？