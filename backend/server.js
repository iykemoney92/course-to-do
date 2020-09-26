const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// create express app
const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.on('open', () => {
    console.log("MongoDB database connection established successfully");
})

const studentRouter = require('./routes/students');
const coursesRouter = require('./routes/courses');

app.use('/students', studentRouter);
app.use('/courses', coursesRouter);

app.use(express.static('../build'));

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});