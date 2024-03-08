import { React, useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addnote } = context;
    const [note, setnote] = useState({title:"", description:"", tag:""})
    const handleClick = (e)=>{
        e.preventDefault()
        addnote(note.title, note.description, note.tag);
        setnote({title:"", description:"", tag:""});
        props.showAlert("Note Added Successfully","success")
    }
    const onChange = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div>
                <h2 className='text-center my-3'><strong>Add a Note</strong></h2>
                <hr/>
                <form className=" border border-2">
                    <div className="mx-3">
                        <label htmlFor="title" className="form-label"><strong>Title</strong></label>
                        <input type="text" placeholder = "At least 5 Character" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange = {onChange} minLength={5} required />
                    </div>
                    <div className="mx-3">
                        <label htmlFor="description" className="form-label"><strong>Description</strong></label>
                        <textarea type="text" rows="15" placeholder = "At least 5 Character" className="form-control" id="description" value={note.description} name="description" onChange = {onChange} minLength={5} required />
                    </div>
                    <div className="mx-3">
                        <label htmlFor="tag" className="form-label"><strong>Tags</strong></label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange = {onChange} />
                    </div>
                    <div className='text-center my-3'>
                    <button disabled={note.title.length<5 || note.description.length <5} type="submit" className="btn btn-primary " onClick={handleClick}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Addnote