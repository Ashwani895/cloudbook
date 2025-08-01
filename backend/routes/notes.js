const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Note.cjs');
const {body,validationResult}=require('express-validator')

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 2: add a new note using: Post "/api/notes/addnote". Login required
router.post('/addnote', fetchuser,[
    body('title','title should be minimum 3 charcater long').isLength({min:3}), 
    body('description','description must be atleast 5 charaters').isLength({min:5})
   

], async (req, res) => {
    try{
    const{title,description,tag}=req.body;
  const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const note=new Notes({
        title ,description,tag,user:req.user.id
    })
    const savedNote=await note.save()

    res.json(savedNote)
}
catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");

}
});

// ROUTE 3: add a new note using: Post "/api/notes/addnote". Login required
// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow update only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    // Update the note
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and check if it exists
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Delete the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
