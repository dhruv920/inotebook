import React, { useState, useContext } from 'react'

import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const[note, setNote] = useState({title:"", description:"", tag:""})
    const handleadd = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        props.showAlert("Note added Successfully","success")
    }

    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
    <div className="container">
      <h1>Add a Note</h1>
      <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control"  onChange={handleChange} id="title" name="title" value={note.title} aria-describedby="emailHelp" />
        
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" onChange={handleChange} id="description" value={note.description} name="description" />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" value={note.tag} onChange={handleChange} id="tag" name="tag" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleadd}>Add Note</button>
        </form>
        </div>
      
    </>
  )
}

export default Addnote
