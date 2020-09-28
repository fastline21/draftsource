const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const path = require('path');

// Load env file
require('dotenv').config();

// Init app
const app = express();

// Database
const db = require('./config/db');
db();

// Init middleware
app.use(express.json({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Init file upload
app.use(fileUpload());

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

// Routes
app.use('/api', require('./routes/index'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

// Port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port:${port}`));
