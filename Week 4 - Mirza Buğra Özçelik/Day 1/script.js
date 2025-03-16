document.addEventListener("DOMContentLoaded", async function () {
  const API_URL = "https://jsonplaceholder.typicode.com/users";
  const STORAGE_KEY = "usersData";
  const EXPIRY_TIME = 24 * 60 * 60 * 1000;

  const root = document.querySelector(".ins-api-users");
  const container = document.createElement("div");
  container.classList.add("container");
  root.appendChild(container);

  const header = document.createElement("h2");
  header.classList.add("header");
  header.textContent = "User List";
  container.appendChild(header);

  const userList = document.createElement("div");
  userList.classList.add("user-list");
  container.appendChild(userList);

  function getStoredData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const { data, timestamp } = JSON.parse(storedData);
      if (Date.now() - timestamp < EXPIRY_TIME) {
        return data;
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  }

  async function fetchUserData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error retrieving user data!");
      }
      const data = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      return data;
    } catch (error) {
      showError(error.message);
      return null;
    }
  }

  function showError(message) {
    userList.innerHTML = `<div class="error-message">${message}</div>`;
  }

  function displayUsers(users) {
    userList.innerHTML = "";
    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");

      const userInfo = document.createElement("div");
      userInfo.classList.add("user-info");
      userInfo.innerHTML = `
        <h3>${user.name}</h3>
        <p>📧 ${user.email}</p>
        <p>📍 ${user.address.street}, ${user.address.city}</p>
      `;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "Delete";
      deleteBtn.setAttribute("data-id", user.id);
      deleteBtn.addEventListener("click", function () {
        deleteUser(user.id);
      });

      userCard.appendChild(userInfo);
      userCard.appendChild(deleteBtn);
      userList.appendChild(userCard);
    });
  }

  function deleteUser(userId) {
    let storedData = getStoredData();
    if (storedData) {
      storedData = storedData.filter(user => user.id != userId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: storedData, timestamp: Date.now() }));
      displayUsers(storedData);
    }
  }

  const cachedData = getStoredData();
  if (cachedData) {
    displayUsers(cachedData);
  } else {
    const fetchedData = await fetchUserData();
    if (fetchedData) {
      displayUsers(fetchedData);
    }
  }
});
