
import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    note_title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('Note', NoteSchema);
export default Note;
