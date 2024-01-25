const mongoose = require('mongoose');

const entrepriseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    linkLinkedin: String,
    linkWebsite: String,
    logo: String,
    adress: String,
    phoneNumber: String,
    email: String,
    category: {
        type: String,
        required: true,
        enum: ['startup', 'company']
    }  
}, 
{
    timestamps: true,
    
} );

module.exports = mongoose.model('Entreprise', entrepriseSchema);