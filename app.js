// express js code

import express from 'express';
import { getNotes, getNote, createNote } from './database.js';

const app = express();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("500 Internal server error");
});

app.listen(8080, () => {
    console.log('server is running on port 8080');
});

app.get("/notes", async (req,res) => {
    // res.send("Notes is here");
    const notes = await getNote();
    res.send(notes);
});

app.get("/notes/:id", async (req,res) => {
    const id = req.params.id;
    const notes = await getNote(id);
    res.send(notes);
});