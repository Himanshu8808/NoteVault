import { React, useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitems from './Noteitems';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getnotes, editnote } = context
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    //use ref hook implementation
    const ref = useRef(null)
    const updatenote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const refClose = useRef(null)
    const handleClick = (e) => {
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully", "success");
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tags</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-3 my-3'>
                <div className="row">
                    <div className="col-md-4 scroll border border-3 mx-2 rounded">
                        <h2 className='my-3 text-center'><strong>Your Notes</strong></h2>
                        <hr/>
                        {notes.map((note) => {
                            return <Noteitems key={note._id} updatenote={updatenote} showAlert={props.showAlert} note={note} />;
                        })}
                    </div>
                    <div className='col-md-7 border border-3 mx-2 rounded'>
                        <Addnote showAlert={props.showAlert} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes