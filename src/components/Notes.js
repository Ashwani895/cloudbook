import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from "./Noteitem"
import AddNote from './AddNote'
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote} = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes()}
    else{
      navigate("/login");
    }
  }, [])

  const ref = useRef(null);  // ✅ Only used for the hidden trigger button
  const [note, setNote] = useState({id:'', title: '', description: '', tag: 'default' });

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag
    });
    ref.current.click();  // ✅ trigger hidden button
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.title, note.description, note.tag);
     document.getElementById('closeModalBtn').click();
    // You can add update logic here later
  }

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
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="title" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" name="description" value={note.description} onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="tag" value={note.tag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="my-1">
          <h2>Your Notes</h2>
          <div className="container">
            {notes.length===0 && 'No notes to display'}
          </div>
          <div className="d-flex flex-wrap">
            {notes.map((note) => {
              return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes;