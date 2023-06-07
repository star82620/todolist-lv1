//20230607 0840-

//C"R"UD 0940-0944
const LOCAL_STORAGE_KEY = "ayu_kata0607";
const tasksData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
const saveData = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksData));
};
const tasksList = document.querySelector("#tasks");
const render = () => {
  let taskHTML = "";
  tasksData.forEach((item) => {
    const isDone = item.done ? "done" : "";
    const isChecked = item.doone ? "checked" : "";
    const taskElement = `<div class="task ${isDone}">
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
    taskHTML += taskElement;
  });
  tasksList.innerHTML = taskHTML;
};
const saveAndRender = () => {
  saveData();
  render();
};

saveAndRender();

//"C"RUD 0945-0948

const newTaskForm = document.querySelector("#new_task_form");
const newTaskInput = document.querySelector("#new_task_input");

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (newTaskInput.value === "") return alert("Please type something.");

  const taskValue = {
    id: Date.now().toString(),
    value: newTaskInput.value,
    done: false,
  };
  tasksData.push(taskValue);
  saveAndRender();
});

//CR"UD" 0851-

tasksList.addEventListener("click", (e) => {
  const btnClass = e.target.classList;
  const taskWrap = e.target.parentNode.parentNode;
  const taskText = taskWrap.querySelector(".text");
  const taskId = e.target.dataset.id;
  const taskIndex = tasksData.findIndex((item) => {
    return item.id === taskId;
  });

  if (btnClass.contains("do")) {
    const isBtnChecked = e.target.checked;
    taskWrap.classList.toggle("done", isBtnChecked);
    tasksData[taskIndex].done = isBtnChecked;
    saveAndRender();
  }
  if (btnClass.contains("edit")) {
    if (e.target.innerText.toLowerCase() === "edit") {
      e.target.innerText = "save";
      taskText.removeAttribute("readonly", "readonly");
      taskText.focus();
      // taskText.setSelectionRanger(999, 999);
    } else {
      e.target.innerText = "edit";
      taskText.setAttribute("readonly", "readonly");
      tasksData[taskIndex].value = taskText.value;
      saveAndRender();
    }
  }
  if (btnClass.contains("delete")) {
    tasksData.splice(taskIndex, 1);
    saveAndRender();
  }
});
