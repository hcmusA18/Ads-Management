// const express = require('express');
// const path = require('path');
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;
const __dirname = path.resolve(); // return the current working directory

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
    res.render('index.html');
});
