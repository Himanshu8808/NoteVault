const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE 1: get all the notes using: GET "/api/notes/fetchallnotes". Login required

try {
    router.get('/fetchallnotes', fetchuser, async (req, res) => {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    });
} catch (error) {
    console.error(error.message);
    res.satus(500).send("Internal server error");
}

//ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {

        //destructuring of body of request
        const { title, description, tag } = req.body;

        // checking validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({Success, errors: errors.array() });
        }

        //creating a new note
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        //saving a note to the database
        const savednote = await note.save();

        //showing the saved note
        res.json(savednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        //create a new note
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});

//ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;