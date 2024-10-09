import express from 'express';
import mongoose from 'mongoose';
import Note from './models/Note.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = 3000;


const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(err);
    }
  };


app.use(express.json());

app.post('/addNote', async (req, res) => {
    console.log(req.body);
    
    const {note_title} = req.body;

    // Basic validation
    if (!note_title) {
        return res.status(400).json({ message: 'Note Title is required.' });
    }

    try {
        const newNote = new Note({note_title});
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/getNotes', async (req, res) => {
    try {
       const notes = await Note.find();
       res.json(notes);
    } catch (err) {
       res.status(500).send(err);
    }
 });


 app.get('/getNote/:id', async (req, res) => {
    try {
       const id = req.params.id
       console.log(req);
       
       const note = await Note.findById(id);
       if (note) {
          res.json(note);
       } else {
          res.status(404).send('Note not found');
       }
    } catch (err) {
       res.status(500).send(err);
    }
 });

  



app.get("/home",(req,res)=>{
    res.send("Hello from yoga")
})




app.listen(PORT,()=>{
    connect();
    console.log(`Server is up and running at port ${3000}`)
   
})

app.put('/updateNote/:id', async (req, res) => {
    try {
       const note = await Note.findByIdAndUpdate(
          req.params.id,
          { note_title: req.body.note_title },
          { new: true }
       );
       if (note) {
          res.json(note);
       } else {
          res.status(404).send('Note not found');
       }
    } catch (err) {
       res.status(500).send(err);
    }
 });
 

app.delete('/deleteNotes/:id', async (req, res) => {
    try {
       const note = await Note.findByIdAndDelete(req.params.id);
       if (note) {
          res.send('Note deleted');
       } else {
          res.status(404).send('Note not found');
       }
    } catch (err) {
       res.status(500).send(err);
    }
 });


 app.get('/search', async (req, res) => {
   try {
      const title = req.query.title;
      const notes = await Note.find({ note_title: new RegExp(title, 'i') });
      res.json(notes);
   } catch (err) {
      res.status(500).send(err);
   }
 });