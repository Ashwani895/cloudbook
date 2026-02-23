import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]); // ✅ Fixed dependency warning

  const ref = useRef(null);
  const [note, setNote] = useState({
    id: '',
    title: '',
    description: '',
    tag: 'default'
  });

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag
    });
    ref.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.title, note.description, note.tag);
    document.getElementById('closeModalBtn').click();
  };

  return (
    <>
      <AddNote />

      {/* Hidden button to trigger modal */}
      <button
        ref={ref}
        type="button"
        id='closeModalBtn'
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch modal
      </button>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={note.title}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={note.description}
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="my-3">
        <h2>Your Notes</h2>

        {notes.length === 0 && (
          <p>No notes to display</p>
        )}

        <div className="d-flex flex-wrap">
          {notes.map((note) => (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              note={note}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;