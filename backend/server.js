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

  



app.get("/home",(req,res)=>{
    res.send("Hello from yoga")
})




app.listen(PORT,()=>{
    connect();
    console.log(`Server is up and running at port ${3000}`)
   
})
