var appendLocation = document.querySelector("#userContainer");
if (!appendLocation) {
  appendLocation = document.createElement("div");
  appendLocation.id = "userContainer";
  document.body.appendChild(appendLocation);
}

document.body.style.backgroundColor = "#121212";
document.body.style.color = "#ffffff";
appendLocation.style.padding = "20px";
appendLocation.style.backgroundColor = "#1e1e1e";
appendLocation.style.borderRadius = "8px";
appendLocation.style.maxWidth = "400px";
appendLocation.style.margin = "20px auto";

var STORAGE_KEY = "usersData";
var EXPIRE_DURATION = 3600000;

function fetchUsers() {
  return [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
  ];
}

function loadUsers() {
  var now = Date.now();
  var users, expire;
  var stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      var parsed = JSON.parse(stored);
      users = parsed.data;
      expire = parsed.expire;
      if (now > expire || !users.length) {
        users = fetchUsers();
        expire = now + EXPIRE_DURATION;
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ data: users, expire: expire })
        );
      }
    } catch (e) {
      users = fetchUsers();
      expire = now + EXPIRE_DURATION;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data: users, expire: expire })
      );
    }
  } else {
    users = fetchUsers();
    expire = now + EXPIRE_DURATION;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data: users, expire: expire })
    );
  }
  renderUsers(users);
}

function renderUsers(users) {
  appendLocation.innerHTML = "";
  users.forEach(function (user) {
    var userDiv = document.createElement("div");
    userDiv.className = "user";
    userDiv.dataset.userId = user.id;
    userDiv.style.padding = "10px";
    userDiv.style.margin = "5px 0";
    userDiv.style.borderRadius = "5px";
    userDiv.style.backgroundColor = "#333";
    userDiv.style.display = "flex";
    userDiv.style.justifyContent = "space-between";
    userDiv.style.alignItems = "center";

    var nameSpan = document.createElement("span");
    nameSpan.textContent = user.name;
    nameSpan.style.color = "#fff";

    var delButton = document.createElement("button");
    delButton.textContent = "Delete";
    delButton.style.backgroundColor = "#ff4444";
    delButton.style.color = "#fff";
    delButton.style.border = "none";
    delButton.style.padding = "5px 10px";
    delButton.style.borderRadius = "5px";
    delButton.style.cursor = "pointer";
    delButton.addEventListener("click", function () {
      deleteUser(user.id);
    });

    userDiv.appendChild(nameSpan);
    userDiv.appendChild(delButton);
    appendLocation.appendChild(userDiv);
  });
}

function deleteUser(userId) {
  var userElem = appendLocation.querySelector(
    '[data-user-id="' + userId + '"]'
  );
  if (userElem) {
    appendLocation.removeChild(userElem);
  }
  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      var parsed = JSON.parse(stored);
      var users = parsed.data;
      users = users.filter(function (user) {
        return user.id !== userId;
      });
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data: users, expire: parsed.expire })
      );
    } catch (e) { }
  }
}

var observer = new MutationObserver(function () {
  var userDivs = appendLocation.querySelectorAll(".user");
  if (userDivs.length === 0 && !sessionStorage.getItem("reloadUsed")) {
    showReloadButton();
  } else {
    var existingButton = document.getElementById("reloadButton");
    if (existingButton) {
      existingButton.remove();
    }
  }
});
observer.observe(appendLocation, { childList: true, subtree: true });

function showReloadButton() {
  if (document.getElementById("reloadButton")) return;
  var btn = document.createElement("button");
  btn.id = "reloadButton";
  btn.textContent = "Reload Users";
  btn.style.backgroundColor = "#008CBA";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.padding = "10px 15px";
  btn.style.borderRadius = "5px";
  btn.style.cursor = "pointer";
  btn.style.display = "block";
  btn.style.margin = "10px auto";
  btn.addEventListener("click", function () {
    sessionStorage.setItem("reloadUsed", "true");
    loadUsers();
    btn.remove();
  });
  appendLocation.appendChild(btn);
}

loadUsers();
