const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data.json');

/* GET stickies listing. */
router.get('/', (req, res, next) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

/* SAVE a sticky. */
router.post('/', (req, res, next) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const stickies = JSON.parse(data);
    const sticky = {
      title: req.body.title,
      notes: req.body.notes,
      id: req.body.id
    };

    stickies.push(sticky);
    fs.writeFile(DATA_FILE, JSON.stringify(stickies, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(stickies);
    });
  });
});

/* UPDATE a sticky. */
router.put('/', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const stickies = JSON.parse(data);
    stickies.forEach((sticky) => {
      if (sticky.id === req.body.id) {
        sticky.title = req.body.title;
        sticky.notes = req.body.notes;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(stickies, null, 4), () => {
      res.json({});
    });
  });
});

/* DELETE a sticky. */
router.delete('/', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let stickies = JSON.parse(data);
    stickies = stickies.filter(sticky => {
      return sticky.id !== req.body.id
    });

    fs.writeFile(DATA_FILE, JSON.stringify(stickies, null, 4), () => {
      res.json({});
    });
  });
});

module.exports = router;
