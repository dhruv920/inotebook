import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props)=>{
  const host = "http://localhost:5000/";

    const notesInitial = []
    const [notes,setNotes] = useState(notesInitial);

     //Fetch all notes 
     const fetchNote =  async()=>{
      //Todo :API Call
     const response = await fetch(`${host}api/notes/fetchallnotes`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzYWQyZTc2YTExZTg4OThhNDY1OTZhIn0sImlhdCI6MTY0ODAyMjI2Mn0.B3Ht2BhKZm6bE5tw7rPoEzfY-oL7hYYdxjL-6q1aHDw"
       },

     });
     const json = await response.json();
       setNotes(json);

   }

    //Add a Note
    const addNote =  async(title, description, tag)=>{
      //API Call 
      const response = await fetch(`${host}api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzYWQyZTc2YTExZTg4OThhNDY1OTZhIn0sImlhdCI6MTY0ODAyMjI2Mn0.B3Ht2BhKZm6bE5tw7rPoEzfY-oL7hYYdxjL-6q1aHDw"
        },
        body: JSON.stringify({title, description, tag}) 
      });
      const note = await response.json()
        setNotes(notes.concat(note));

    }

    //Delete a Note
    const deleteNote = async(id)=>{
      //API Call
      const response = await fetch(`${host}api/notes/deletenotes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzYWQyZTc2YTExZTg4OThhNDY1OTZhIn0sImlhdCI6MTY0ODAyMjI2Mn0.B3Ht2BhKZm6bE5tw7rPoEzfY-oL7hYYdxjL-6q1aHDw"
        }
      });
      const json = response.json(); 
      const newNote = notes.filter((note)=>{return note._id!==id});
      setNotes(newNote);
        
    }

    //edir a Note
     const editNote = async (id, title, description, tag)=>{
      //API Call 
      const response = await fetch(`${host}api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzYWQyZTc2YTExZTg4OThhNDY1OTZhIn0sImlhdCI6MTY0ODAyMjI2Mn0.B3Ht2BhKZm6bE5tw7rPoEzfY-oL7hYYdxjL-6q1aHDw"
        },
        body: JSON.stringify({title, description, tag}) 
      });

      const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes))
    
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
         
        }
        setNotes(newNotes);

    }


return (
    <NoteContext.Provider  value={{notes, addNote, deleteNote, editNote, fetchNote}}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;

