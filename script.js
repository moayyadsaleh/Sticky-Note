document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const createNoteBtn = document.getElementById("createNoteBtn");

  createNoteBtn.addEventListener("click", function () {
    createStickyNote();
  });

  loadStickyNotes();

  function createStickyNote() {
    const note = document.createElement("div");
    note.classList.add("sticky-note");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Title";
    titleInput.classList.add("note-title");

    const deadlineInput = document.createElement("input");
    deadlineInput.type = "datetime-local";
    deadlineInput.placeholder = "Deadline";
    deadlineInput.classList.add("note-deadline");

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Enter your note here...";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "&#x2715;";
    deleteBtn.addEventListener("click", function () {
      container.removeChild(note);
      saveStickyNotes();
    });

    note.appendChild(titleInput);
    note.appendChild(deadlineInput);
    note.appendChild(textarea);
    note.appendChild(deleteBtn);
    container.appendChild(note);

    saveStickyNotes();
  }

  function saveStickyNotes() {
    const notes = [];
    const noteElements = container.querySelectorAll(".sticky-note");
    noteElements.forEach((noteElement) => {
      const title = noteElement.querySelector(".note-title").value;
      const deadline = noteElement.querySelector(".note-deadline").value;
      const text = noteElement.querySelector("textarea").value;

      notes.push({ title, deadline, text });
    });

    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }

  function loadStickyNotes() {
    const savedNotes = localStorage.getItem("stickyNotes");
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      notes.forEach((note) => {
        createStickyNoteWithData(note);
      });
    }
  }

  function createStickyNoteWithData(data) {
    const note = document.createElement("div");
    note.classList.add("sticky-note");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Title";
    titleInput.classList.add("note-title");
    titleInput.value = data.title;

    const deadlineInput = document.createElement("input");
    deadlineInput.type = "datetime-local";
    deadlineInput.placeholder = "Deadline";
    deadlineInput.classList.add("note-deadline");
    deadlineInput.value = data.deadline;

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Enter your note here...";
    textarea.value = data.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "&#x2715;";
    deleteBtn.addEventListener("click", function () {
      container.removeChild(note);
      saveStickyNotes();
    });

    note.appendChild(titleInput);
    note.appendChild(deadlineInput);
    note.appendChild(textarea);
    note.appendChild(deleteBtn);
    container.appendChild(note);
  }
});
