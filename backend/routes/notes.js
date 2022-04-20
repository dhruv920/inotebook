const express = require('express')
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//route 1 get all notes  using GET: "api/notes/fetchallnotes" login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal some error occured");
    }
   
})


//route 2 adding notes using post: "api/notes/addnotes" login required
router.post('/addnotes',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "description Must be atleast than 5 characters").isLength({
      min: 5,
    }),
],async (req,res)=>{
    try {

        const{title,description,tag} = req.body;
        //if there are errors send some bad request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const note = new Note({
            title,description,tag,user:req.user.id
        })
        
        const savedNote = await note.save()
    
        res.json(savedNote)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal some error occured");
    }

})


//route 3 updatting an existing node notes using putt: "api/notes/updatenotes" login required
router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    try {
        const {title, description, tag} = req.body;

        //create a new note object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
    
        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){res.status(401).send("Not Found")};
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal some error occured");
    }
   
})

//route 4 deleting an existing node notes using delete: "api/notes/deletenotes" login required
router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
    try {
        //find the note to be updated and delete it
        let note = await Note.findById(req.params.id);
        if(!note){res.status(401).send("Not Found")};
    
        //allow deletion only if user owns thisNote
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success":"Note has been deleted", note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal some error occured");
    }
})



module.exports = router