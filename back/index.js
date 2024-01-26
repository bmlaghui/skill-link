const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const rateLimit = require('express-rate-limit');

// Create the server
const app = express();
app.use(express.json());

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Entreprises Routes
app.use( require('./routes/entrepriseRoutes.js'));
// Missions Routes
app.use( require('./routes/missionRoutes.js'));
// Users Routes
app.use( require('./routes/userRoutes.js'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

mongoose.connection.once('close', () => {
  console.log('Connection to Database closed');
});
mongoose.connection.on('error', (error) => {
  console.log('Mongoose Connection Error: ' + error);
});

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Apply the rate limiter to all requests
app.use(limiter);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Skill Link API!');
});

app.get('/ping', (req, res) => {
  res.status(200).send({ message: 'ok' }); // Status 200 for OK
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));