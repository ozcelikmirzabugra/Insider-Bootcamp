document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", function () {
        let taskText = taskInput.value.trim();
        if (taskText === "") return;

        let taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        let textSpan = document.createElement("span");
        textSpan.textContent = taskText;

        let actionButtons = document.createElement("div");
        actionButtons.classList.add("actions");

        let completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", function () {
            taskItem.classList.toggle("completed");
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            taskItem.remove();
        });

        actionButtons.appendChild(completeBtn);
        actionButtons.appendChild(deleteBtn);
        taskItem.appendChild(textSpan);
        taskItem.appendChild(actionButtons);
        taskList.appendChild(taskItem);

        taskInput.value = "";
    });
});