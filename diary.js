const SECRET_PASSWORD = "sakshi143";

const loginScreen = document.getElementById("loginScreen");
const diaryScreen = document.getElementById("diaryScreen");

const passwordInput = document.getElementById("passwordInput");
const loginMessage = document.getElementById("loginMessage");

const dateInput = document.getElementById("date");
const titleInput = document.getElementById("title");
const entryInput = document.getElementById("entry");
const entriesContainer = document.getElementById("entries");

// Store diary entries
let entries = JSON.parse(
  localStorage.getItem("secretDiaryEntries")
) || [];

// Set today's date
dateInput.value = new Date().toISOString().split("T")[0];


// ==========================================
// LOGIN
// ==========================================

function login() {
  const password = passwordInput.value;

  if (password === SECRET_PASSWORD) {
    loginScreen.style.display = "none";
    diaryScreen.classList.remove("hidden");

    passwordInput.value = "";
    loginMessage.textContent = "";

    displayEntries();
  } else {
    loginMessage.textContent = "❌ Incorrect password!";
    passwordInput.value = "";
  }
}


// Press Enter to login
passwordInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    login();
  }
});


// ==========================================
// LOGOUT / LOCK
// ==========================================

function logout() {
  diaryScreen.classList.add("hidden");
  loginScreen.style.display = "flex";

  passwordInput.value = "";
  passwordInput.focus();
}


// ==========================================
// SAVE ENTRY
// ==========================================

function saveEntry() {
  const date = dateInput.value;
  const title = titleInput.value.trim();
  const text = entryInput.value.trim();

  if (!date || !title || !text) {
    alert("Please fill in all fields.");
    return;
  }

  const newEntry = {
    id: Date.now(),
    date: date,
    title: title,
    text: text
  };

  entries.unshift(newEntry);

  localStorage.setItem(
    "secretDiaryEntries",
    JSON.stringify(entries)
  );

  titleInput.value = "";
  entryInput.value = "";

  displayEntries();
}


// ==========================================
// DISPLAY ENTRIES
// ==========================================

function displayEntries() {
  entriesContainer.innerHTML = "";

  if (entries.length === 0) {
    entriesContainer.innerHTML = `
      <div class="empty">
        No diary entries yet. ✨
      </div>
    `;
    return;
  }

  entries.forEach(function(entry) {

    const card = document.createElement("div");
    card.className = "entry-card";

    const title = document.createElement("h3");
    title.textContent = entry.title;

    const date = document.createElement("div");
    date.className = "entry-date";
    date.textContent = entry.date;

    const text = document.createElement("div");
    text.className = "entry-text";
    text.textContent = entry.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "🗑️ Delete";

    deleteButton.onclick = function() {
      deleteEntry(entry.id);
    };

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(text);
    card.appendChild(deleteButton);

    entriesContainer.appendChild(card);
  });
}


// ==========================================
// DELETE ENTRY
// ==========================================

function deleteEntry(id) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this entry?"
  );

  if (!confirmDelete) {
    return;
  }

  entries = entries.filter(function(entry) {
    return entry.id !== id;
  });

  localStorage.setItem(
    "secretDiaryEntries",
    JSON.stringify(entries)
  );

  displayEntries();
}