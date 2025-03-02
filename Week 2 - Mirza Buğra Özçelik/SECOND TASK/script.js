document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  const errorDiv = document.getElementById("formError");
  const filterBtn = document.getElementById("filterCompleted");
  const sortBtn = document.getElementById("sortPriority");

  const priorityRank = { Low: 1, Medium: 2, High: 3 };

  let filterActive = false;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const desc = document.getElementById("taskDesc").value.trim();
    const selectedPriority = document.querySelector(
      'input[name="priority"]:checked'
    );

    if (!title) {
      errorDiv.textContent = "Title is required.";
      return;
    }
    if (!selectedPriority) {
      errorDiv.textContent = "Please select a priority.";
      return;
    }
    errorDiv.textContent = "";

    const taskCard = document.createElement("li");
    taskCard.classList.add("task-card");
    taskCard.dataset.priority = selectedPriority.value;

    taskCard.innerHTML = `
      <div class="task-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--primary)" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      </div>
      <div class="task-info">
        <h3>${title}</h3>
        ${desc ? `<p>${desc}</p>` : ""}
        <span>Priority: ${selectedPriority.value}</span>
      </div>
      <div class="task-actions">
        <button class="complete-btn" title="Mark as complete">✔</button>
        <button class="delete-btn" title="Delete task">✖</button>
      </div>
    `;

    taskCard.querySelector(".complete-btn").addEventListener("click", () => {
      taskCard.classList.toggle("completed");
    });

    taskCard.querySelector(".delete-btn").addEventListener("click", () => {
      taskCard.remove();
    });

    taskList.appendChild(taskCard);
    form.reset();
  });

  filterBtn.addEventListener("click", () => {
    const tasks = document.querySelectorAll(".task-card");
    if (!filterActive) {
      tasks.forEach((task) => {
        task.style.display = task.classList.contains("completed")
          ? "grid"
          : "none";
      });
      filterBtn.textContent = "Show All";
      filterActive = true;
    } else {
      tasks.forEach((task) => {
        task.style.display = "grid";
      });
      filterBtn.textContent = "Show Completed";
      filterActive = false;
    }
  });

  sortBtn.addEventListener("click", () => {
    const tasksArray = Array.from(taskList.children);
    tasksArray.sort((a, b) => {
      return (
        priorityRank[a.dataset.priority] - priorityRank[b.dataset.priority]
      );
    });
    taskList.innerHTML = "";
    tasksArray.forEach((task) => taskList.appendChild(task));
  });
});
