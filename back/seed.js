const faker = require('faker');
const mongoose = require('mongoose');
const Entreprises = require('./models/entrepriseModel.js');

async function seedData() {
    const uri = process.env.MONGODB_URI;
    const seed_count = 5000;
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to Database');
    } catch (err) {
        console.log('Error: ' + err);
        return;
    }

    let timeSeriesData = [];
    for (let i = 0; i < seed_count; i++) {
        timeSeriesData.push({
            name: faker.company.companyName(),
            description: faker.company.catchPhrase(),
            location: faker.address.city(),
            website: faker.internet.url(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            logo: faker.image.business(),
            created_at: faker.date.past(),
            updated_at: faker.date.recent()
        });
    }
    try {
        await Entreprises.create(timeSeriesData);
        console.log('Data seeded successfully');
    } catch (err) {
        console.log('Error: ' + err);
    } finally {
        mongoose.connection.close();
        console.log('Connection to Database closed');
    }
}

module.exports = seedData;