import React, { useContext } from 'react';
import NoteContext from "../context/notes/noteContext";

const Noteitem = ({ note, updateNote }) => {
  const { deleteNote } = useContext(NoteContext);

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100 border-0">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-primary fw-bold">{note.title}</h5>
            <p className="card-text text-secondary">{note.description}</p>
          </div>

          <div className="mt-3 d-flex justify-content-end gap-2">
            <button 
              className="btn btn-sm btn-outline-danger" 
              onClick={() => deleteNote(note._id)}
            >
              <i className="fa-solid fa-trash"></i> Delete
            </button>

            <button 
              className="btn btn-sm btn-outline-primary" 
              onClick={() => updateNote(note)}
            >
              <i className="fa-solid fa-pen-to-square"></i> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
