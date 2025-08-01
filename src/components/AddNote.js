import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: '', description: '', tag: 'default' });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: 'default' });
    alert("Note added successfully");
  };

  return (
    <div className="container my-4 p-4 shadow rounded bg-light">
      <h2 className="text-center mb-4 text-primary">📝 Add a New Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="title" 
            name="title" 
            placeholder="Enter note title"
            value={note.title} 
            onChange={onChange} 
          />
          {note.title.length < 3 && <small className="text-danger">Minimum 3 characters</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">Description</label>
          <textarea 
            className="form-control" 
            id="description" 
            name="description" 
            rows="4"
            placeholder="Write your note here..."
            value={note.description} 
            onChange={onChange}
          ></textarea>
          {note.description.length < 5 && <small className="text-danger">Minimum 5 characters</small>}
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label fw-semibold">Tag</label>
          <input 
            type="text" 
            className="form-control" 
            id="tag" 
            name="tag" 
            placeholder="Enter a tag (optional)"
            value={note.tag} 
            onChange={onChange} 
          />
        </div>

        <div className="d-grid">
          <button 
            type="submit" 
            className="btn btn-success btn-lg"
            onClick={handleClick}
            disabled={note.title.length < 3 || note.description.length < 5}
          >
            ➕ Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
