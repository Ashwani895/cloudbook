import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8000"; 

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // 📥 Get All Notes
const getNotes = async () => {
  try {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const json = await response.json();
    console.log("Fetched notes:", json); // 👈 check what this logs

    if (Array.isArray(json)) {
      setNotes(json);
    } else {
      console.error("Notes response is not an array:", json);
      setNotes([]); // fallback to empty array
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    setNotes([]); // prevent crash
  }
};


  // ➕ Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // ✅ FIXED: JSON.stringify spelling and structure
    });

    const note = await response.json();
    setNotes(notes.concat(note)); // ✅ Append to current notes
  };

  // ❌ Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json=response.json();
    console.log(json)
    console.log("Deleting note with id: " + id);
    const newNotes = notes.filter((note) => note._id !== id); // ✅ FIXED extra braces
    setNotes(newNotes);
  };

  // ✏️ Edit Note
  const editNote = async (id, title, description, tag) => {
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({ title, description, tag })
  });

  const json = await response.json();
  console.log("Edited:", json);

  const updatedNotes = notes.map((note) => {
    if (note._id === id) {
      return { ...note, title, description, tag };
    }
    return note;
  });
  setNotes(updatedNotes);
};


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
