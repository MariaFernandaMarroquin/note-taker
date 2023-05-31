const notes = require("express").Router();

// Helper functions for reading and writing to the JSON file
const { readFromFile, writeToFile, readAndAppend } = require("../helpers/helpers");


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
        };

        readFromFile('./db/db.json', "utf8").then((data) => {
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            writeToFile("./db/db.json", JSON.stringify(parsedData)).then(() => {
                res.status(200).json(`Note added successfully 📗`);
                console.log("Note added succesfully 📗")
            }).catch((err) => {
                console.log(err)
                res.status(400).json(err);
            })
        }).catch((err) => {
            res.status(400).json(err);
        })
    } else {
        res.error('Error in adding note');
    }
});

module.exports = notes;