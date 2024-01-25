const express = require('express');
const mongoose = require('mongoose');
const Entreprise = require('./models/Entreprise');
const Mission = require('./models/Mission')
const app = express();

app.use(express.json());



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/skill-link-db');
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
});
mongoose.connection.on('error', (error) => {
    console.log('Mongoose Connection Error : ' + error);
});

// Routes
app.get('/', (req, res) => res.send('Welcome to Skill Link API!'));
// Entreprises Routes
app.use( require('./routes/entreprisesRoutes'));
// Missions Routes
app.use( require('./routes/missionsRoutes'));








// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));