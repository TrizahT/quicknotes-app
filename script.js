const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = [];
function saveNotes() {
  localStorage.setItem("quickNotes", JSON.stringify(notes));
}
function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}
function render(notesToRender = notes) {
    notesList.innerHTML = "";
    if (notesToRender.length === 0 && searchInput.value.trim() !== "")
       {
      const message = document.createElement("li");
      message.textContent = "No notes match your search.";
      notesList.appendChild(message);
    }
    notesToRender.forEach((note) => {
      const li = document.createElement("li");
      li.classList.add(`category-${note.category}`);
  
      const text = document.createElement("p");
      text.classList.add("note-text");
      text.textContent = note.text;
  
      const category = document.createElement("span");
      category.classList.add("note-category");
      category.textContent = note.category;
  
      const date = document.createElement("p");
      date.classList.add("note-date");
      date.textContent = note.createdAt;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        notes = notes.filter((item) => item.id !== note.id);
        saveNotes();
        render();
      });
      li.appendChild(text);
      li.appendChild(category);
      li.appendChild(date);
      li.appendChild(deleteButton);
  
      notesList.appendChild(li);
    });
  
    updateNoteCount();
  }
  
  noteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessage.textContent = "";

const text = noteInput.value.trim();

if (text === "") {
  errorMessage.textContent = "Please type a note first.";
  return;
}

if (text.length > 200) {
  errorMessage.textContent = "Notes must be 200 characters or fewer.";
  return;
}

  
    const newNote = {
      id: Date.now(),
      text: text,
      category: noteCategory.value,
      createdAt: new Date().toLocaleString(),
    };
  
    notes.push(newNote);
    saveNotes();
    render();
    noteInput.value = "";
  });
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
  
    const filteredNotes = notes.filter((note) =>
      note.text.toLowerCase().includes(searchTerm)
    );
  
    render(filteredNotes);
  });
  const savedNotes = localStorage.getItem("quickNotes");

if (savedNotes !== null) {
  notes = JSON.parse(savedNotes);
}

render();