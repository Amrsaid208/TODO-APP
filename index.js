let arrayOfTasks = [];
inp = document.querySelector(".input");
add = document.querySelector(".add");
tasks = document.querySelector(".tasks");
head = document.querySelector(".head");

getDataFromLocalStorage();

function addItem(taskName) {
  if (taskName.trim().length) {
    const task = {
      id: Date.now(),
      name: taskName,
      status: false,
    };
    arrayOfTasks.push(task);
    addDataToLocalStorage(arrayOfTasks);
    drawItems(arrayOfTasks);
  }
}

function drawItems(items) {
  tasks.innerHTML = `${
    items.length
      ? `  <h2 class="head">Your Tasks</h2>`
      : `  <h2 class="head">You have nothing to do</h2>`
  }`;

  items.forEach((item) => {
    task = document.createElement("div");
    task.innerHTML = `<h3>${item.name}</h3>`;
    task.setAttribute("data-id", item.id);
    task.className = "task";

    if (item.status) {
      task.className = "task done";
    }
    del = document.createElement("btn");
    del.className = "Del";
    del.innerText = "Delete";
    del.style.cssText =
      "background:teal; padding:0.5rem;border:0;border-radius:3px;color:white;cursor:pointer";
    del.addEventListener("click", () => deleteTask(item.id));
    task.appendChild(del);
    task.style.cssText =
      "background:white;border:1px solid #ddd ;cursor:pointer; padding:1rem 1.5rem ;font-size:1.3rem  ;margin-top:2rem; border-radius:8px ;display:flex ;justify-content:space-between;align-items:center;";

    tasks.appendChild(task);

    inp.value = "";
  });
}

add.addEventListener("click", function () {
  addItem(inp.value);
  drawItems(arrayOfTasks);
});
function deleteTask(id) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
  addDataToLocalStorage(arrayOfTasks);
  drawItems(arrayOfTasks);
}

function addDataToLocalStorage(items) {
  window.localStorage.setItem("tasks", JSON.stringify(items));
}

function getDataFromLocalStorage() {
  let taskat = window.localStorage.getItem("tasks");
  if (taskat) {
    arrayOfTasks = JSON.parse(taskat);
    drawItems(arrayOfTasks);
  }
}
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function toggleStatus(id) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == id) {
      arrayOfTasks[i].status = !arrayOfTasks[i].status;
      addDataToLocalStorage(arrayOfTasks);
    }
  }
}
