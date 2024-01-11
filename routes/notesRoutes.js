const express = require('express');
const noteRoute = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, './db/db.json');

noteRoute.get('/api/notes', (req, res) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if(err) {
      return res.status(500).json({ error: 'Internal Server Error'});
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});


noteRoute.post('/api/notes', (req, res) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if(err) {
      return res.status(500).json({ error: 'Internal Server Error'});
    }

    const notes = JSON.parse(data);

    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };

    notes.push(newNote);

    fs.writeFile(dbPath, JSON.stringify(notes), err => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error'});
      }
      res.json(newNote);
    });
  });
});
module.exports = noteRoute;