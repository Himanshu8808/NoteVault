require('dotenv').config();
import { React, useState } from "react";
import noteContext from "./noteContext";

const Notestate = (props) => {
  const host = process.env.HOST; 
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)

  // fetch all note
  const getnotes = async () => {
    //api call here
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      }
    });
    const json = await response.json();
    setnotes(json);
  }

  // Add a note
  const addnote = async (title, description, tag) => {
    //api call here
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note))
  }

  // Delete a note
  const deletenote = async (id) => {
    //api call here
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      }
    });
    const json =await response.json();
    console.log(json);

    const newNote = notes.filter((note) => { return note._id !== id })
    
    setnotes(newNote);
  }

  // Edit a note
  const editnote = async (id, title, description, tag) => {
    //api call here
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //logic to edit a note in client side
    let newnotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setnotes(newnotes);
  }

  return (
    <noteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default Notestate;