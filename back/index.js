const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');
const rateLimit = require('express-rate-limit');
const cron = require("node-cron");
const { faker } = require('@faker-js/faker');
const User = require('./models/User');
const Entreprise = require('./models/Entreprise');
const Mission = require('./models/Mission');
const Application = require('./models/Application');

// Create the server
const app = express();
app.use(express.json());

var options = {
  explorer: true
};

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Entreprises Routes
app.use(require('./routes/entrepriseRoutes.js'));
// Missions Routes
app.use(require('./routes/missionRoutes.js'));
// Users Routes
app.use(require('./routes/userRoutes.js'));
// Dashboard Routes
app.use(require('./routes/dashboardRoutes.js'));

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

// const seedData = require('./seed.js');
// seedData();
// Start the server

const generateRandomUser = async (entreprise) => {

  const user = new User({

    firstName: faker.name.firstName(),

    lastName: faker.name.lastName(),

    email: faker.internet.email(),

    username: faker.internet.userName(),

    phoneNumber: faker.phone.phoneNumber(),

    role: 'entreprise',

    password: faker.internet.password(),

    skills: [faker.random.word()],

    _idEntreprise: entreprise._id,

  });


  await user.save();

  return user;

};


const generateRandomEntreprise = async () => {

  const entreprise = new Entreprise({

    name: faker.company.companyName(),

    description: faker.lorem.paragraph(),

    linkLinkedin: faker.internet.url(),

    linkWebsite: faker.internet.url(),

    logo: faker.image.avatar(),

    adress: faker.address.streetAddress(),

    phoneNumber: faker.phone.phoneNumber(),

    email: faker.internet.email(),

    category: faker.random.arrayElement(['startup', 'company']),

  });


  await entreprise.save();


  // Generate a random user with the role "entreprise" and associate it with the entreprise

  await generateRandomUser(entreprise);


  return entreprise;

};


const generateRandomMission = async (entreprise) => {

  const mission = new Mission({

    title: faker.commerce.productName(),

    description: faker.lorem.paragraph(),

    requiredSkills: [faker.random.word()],

    _idEntreprise: entreprise._id,

    isFinalClient: faker.datatype.boolean(),

    category: faker.random.arrayElement(['CDD', 'CDI', 'Potage salarial']),

    tjm: faker.datatype.number(),

    dateDebut: faker.date.between('2022-01-01', '2023-12-31'),

    status: faker.random.arrayElement(['draft', 'published', 'archived']),

  });


  await mission.save();

  return mission;

};


const generateRandomApplication = async (user, mission) => {

  const application = new Application({

    _idMission: mission._id,

    coverLetter: faker.lorem.paragraph(),

    statut: faker.random.arrayElement(['draft', 'published', 'archived']),

    _idUser: user._id,

  });


  await application.save();

  return application;

};


cron.schedule('* * * * *', async () => {

  console.log('Generating random data...');


  // Generate a random entreprise and associate it with a user

  const entreprise = await generateRandomEntreprise();


  // Generate a random mission for the entreprise

  const mission = await generateRandomMission(entreprise);


  // Generate a random application for the mission

  const user = await User.findOne({ role: 'candidat' }).exec();

  const application = await generateRandomApplication(user, mission);


  console.log(`Generated: ${entreprise.name}, ${mission.title}, ${application._idUser}`);

});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
