const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

let notes = [];
function render() {
    notesList.innerHTML = "";
  
    notes.forEach((note) => {
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
  
      li.appendChild(text);
      li.appendChild(category);
      li.appendChild(date);
      li.appendChild(deleteButton);
  
      notesList.appendChild(li);
    });
  }
  noteForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const newNote = {
      id: Date.now(),
      text: noteInput.value,
      category: noteCategory.value,
      createdAt: new Date().toLocaleString(),
    };
  
    notes.push(newNote);
    render();
  
    noteInput.value = "";
  });
  const newNote = {
    id: Date.now(),
    text: noteInput.value,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(newNote);
  renderO();
  noteInput.value = "";