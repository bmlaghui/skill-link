const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Create the server
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});

mongoose.connection.once('close', () => {
    console.log('Connection to Database closed');
});
mongoose.connection.on('error', (error) => {
    console.log('Mongoose Connection Error : ' + error);
});


// Routes
app.get('/', (req, res) => {res.send('Welcome to Skill Link API!')});
app.get('/ping', (req, res) => {
    res.status(200).send({'message': 'ok'}); // Status 200 for OK
})
// Entreprises Routes
app.use( require('./routes/entreprisesRoutes'));
// Missions Routes
app.use( require('./routes/missionsRoutes'));


// Start the server
const port = process.env.PORT || 3080;
app.listen(port, () => console.log(`Server running on port ${port}`));