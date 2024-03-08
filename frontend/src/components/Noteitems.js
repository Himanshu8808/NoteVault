import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitems = (props) => {
    const context = useContext(noteContext);
    const { deletenote } = context;
    const { note, updatenote } = props;
    const [expanded, setExpanded] = useState(false);

    // Function to toggle expansion of note
    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="my-2">
            <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-3">{note.title}</h5>
                    {/* Conditional rendering for note description */}
                    {note.description.length > 50 && !expanded ? (
                        <>
                            <p className="card-text flex-grow-1">{note.description.slice(0, 50)}...</p>
                        </>
                    ) : (
                        <p className="card-text flex-grow-1">{note.description}</p>
                    )}
                    <div className="d-flex justify-content-between">
                        {note.description.length > 50 ?
                        <button className= "btn btn-primary" onClick={toggleExpansion}>
                            {!expanded ?"Read More": "Read Less"}
                        </button>:
                        <button className= "btn btn-primary invisible" onClick={toggleExpansion}>
                            {!expanded ?"Read More": "Read Less"}
                        </button>}
                        <div>
                            <button className="btn btn-danger me-2" onClick={() => { deletenote(note._id); props.showAlert("Note Deleted", "success") }}>
                                <i className="fas fa-trash"></i>
                            </button>
                            <button className="btn btn-primary me-2" onClick={() => { updatenote(note) }}>
                                <i className="fas fa-edit"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Noteitems;
