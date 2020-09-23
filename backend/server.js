const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.on('open', () => {
    console.log("MongoDB database connection established successfully");
})

// create express app
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is listening on port 8080' + port);
});