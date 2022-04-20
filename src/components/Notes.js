import React,{useContext, useEffect,useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote'

const Notes = (props) => {
  const context = useContext(noteContext);
  const {notes,fetchNote, editNote} = context;

  const[note, setNote] = useState({id: "",etitle:"", edescription: "", etag: ""})

  const handleChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }

  const handleClick = (e)=>{
    console.log("update note" ,note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showALert("Updated Successfully","success");
  }

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }

  useEffect(()=>{
    fetchNote()
    // eslint-disable-next-line
  },[])
  return (
    <>  
    <Addnote showALert={props.showALert} />
        
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
              <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control"  onChange={handleChange} id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" minLength={5} required/>
                
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={handleChange} id="edescription" value={note.edescription} name="edescription" minLength={5} required/>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={handleChange} id="etag" value={note.etag} name="etag" minLength={5} required />
                  </div>
                </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
    <h2>You Notes</h2>
    <div className="container">{notes.length===0 && 'No Notes to Display.'}</div>
    {notes.map((note)=>{
        return <Noteitem key={note._id} updateNote={updateNote} showALert={props.showALert} notes={note} /> 
    })}
  </div>
  </>
  )
}

export default Notes