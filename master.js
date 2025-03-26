let addTask = document.querySelector(".add");
let input = document.querySelector("input");
let taskContainer = document.querySelector(".tasks");
let allTasks = document.getElementsByClassName("task");
let delAll = document.querySelector(".del-all");
let countTasks = 1;

let getTaskInfoLocalSt = JSON.parse(localStorage.storeTaskInfo);

let taskInfoLocalSt = getTaskInfoLocalSt.length === 0 ? [] : getTaskInfoLocalSt;

function taskContent() {
  let createTask = document.createElement("div");
  createTask.style.cssText = `
        background-color: white;
        padding: 15px;
        border-radius: 6px;
    `;
  createTask.classList.add("task", "d-flex");
  createTask.id = `task-${countTasks}`;
  taskContainer.append(createTask);

  function checkLastTask() {
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i] !== allTasks[allTasks.length - 1]) {
        allTasks[i].style.marginBottom = "20px";
      }
    }
  }
  checkLastTask();

  function createTaskText() {
    let taskText = document.createElement("p");
    taskText.textContent = `${countTasks}- ${input.value}`;
    taskText.style.flex = "1";
    createTask.append(taskText);
  }
  createTaskText();

  function createTaskBtns() {
    let taskBtns = document.createElement("div");
    taskBtns.style.gap = "20px";
    taskBtns.classList.add("btns", "d-flex");
    createTask.append(taskBtns);
    function createEditBtn() {
      let editBtn = document.createElement("span");
      editBtn.textContent = "Edit";
      editBtn.className = "btn";
      editBtn.style.cssText = `
        background-color: #FFC107;
        `;
      taskBtns.append(editBtn);
    }
    createEditBtn();

    function createDeleteBtn() {
      let delBtn = document.createElement("span");
      let allDelBtns = document.getElementsByClassName("delete");
      delBtn.textContent = "Delete";
      delBtn.classList.add("btn", "delete");
      delBtn.style.backgroundColor = "var(--delete-color)";
      taskBtns.append(delBtn);

      delBtn.onclick = () => {
        for (let i = 0; i < taskInfoLocalSt.length; i++) {
          if (delBtn.closest(".task").id === taskInfoLocalSt[i].id) {
            delBtn.closest(".task").remove();
            taskInfoLocalSt.splice([i], 1);
            localStorage.storeTaskInfo = JSON.stringify(taskInfoLocalSt);
            allTasks.length > 0
              ? (allTasks[allTasks.length - 1].style.marginBottom = "0")
              : "";

            countTasks = 1;
            for (let i = 0; i < taskInfoLocalSt.length; i++) {
              document.getElementsByTagName("p")[
                i
              ].textContent = `${countTasks}- ${taskInfoLocalSt[i].taskName}`;
              allTasks[i].id = `task-${countTasks}`;
              taskInfoLocalSt[i].id = `task-${countTasks}`;
              localStorage.storeTaskInfo = JSON.stringify(taskInfoLocalSt);
              countTasks++;
            }

            if (allDelBtns.length === 0) {
              delAll.style.display = "none";
            }
          }
        }
      };
    }
    createDeleteBtn();
  }
  createTaskBtns();
}

if (getTaskInfoLocalSt.length > 0) {
  delAll.style.display = "block";
  countTasks = 1;

  for (let i = 0; i < getTaskInfoLocalSt.length; i++) {
    taskContent();
    taskInfoLocalSt[i].id = `task-${countTasks}`; // look if there are best solution for it
    localStorage.storeTaskInfo = JSON.stringify(taskInfoLocalSt); // look if there are best solution for it
    document.querySelectorAll(".task p")[
      i
    ].textContent = `${countTasks}- ${getTaskInfoLocalSt[i].taskName}`;
    countTasks++;
  }
}

addTask.onclick = () => {
  if (/[a-zA-Z\d]+/i.test(input.value)) {
    delAll.style.display = "block";
    taskContainer.style.cssText = `
      padding: 20px;
      border-radius: 10px;
    `;
    taskContent();
    taskInfoLocalSt.push({
      id: `task-${countTasks}`,
      taskName: input.value,
    });
    localStorage.storeTaskInfo = JSON.stringify(taskInfoLocalSt);

    input.value = "";
    countTasks++;
    input.focus();
  }
};

delAll.onclick = () => {
  delAll.style.display = "none";
  taskContainer.innerHTML = "";
  taskInfoLocalSt = [];
  localStorage.storeTaskInfo = JSON.stringify([]);
  countTasks = 1;
};
