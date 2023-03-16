
window.addEventListener("load", function() {
    const form = document.querySelector("#new_task_form");
    const input = document.querySelector("#new_task_input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener("submit", function(e) {
        // 取消 form submit 本身的 DOM 動作
        e.preventDefault();

        // input #new_task_input 的 value 屬性的值
        const task = input.value;

        // 如果 task 裡面沒有 value 的話就跳提示訊息，並且停止往下動作
        if (!task) {
            alert("Please add task content");
            return;
        } 

        // 創建一個 div 並給這個 div: class="task"
        const task_el = document.createElement("div");
        task_el.classList.add("task");
        
        // 創建一個 div 並給這個 div: class="task"，並加入 task 變數中的值
        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
        task_content_el.innerTEXT = task ;
        
        task_el.appendChild(task_content_el);


        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.setAttribute("value",task);
        // 可以直接 task_input_el.value = task;
        // 可以直接 task_input_el.type = "text";
        task_input_el.setAttribute("type","text");
        task_input_el.setAttribute("readonly","readonly");
        // 在 HTML 裡看起來只有 readonly 其實有屬性名稱是 readonly
        
        task_content_el.appendChild(task_input_el);


        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");
        
        
        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "edit" ;
        
        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "delete" ;
        
        task_el.appendChild(task_actions_el);
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        
        list_el.appendChild(task_el);
        // 加入的順序沒有影響，一樣可以動作

        //因為跑完上面的增加節點動作之後，new_task_input 裡面的值還在，所以要清空它
        input.value = "";

        task_edit_el.addEventListener("click", function() {
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                // 移除唯獨狀態，讓 input 可以編輯
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerHTML = "save";
                console.log("YES");
            } else {
                task_input_el.setAttribute("readonly", "readonly") ;
                task_edit_el.innerHTML = "edit";
            }
        });
        task_delete_el.addEventListener("click", function() {
            task_el.remove();
            // list_el.removeChild(task_el);
            // 這兩行的作用應該是一樣的？
        });
    });

});