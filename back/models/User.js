const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type:String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['candidat', 'entreprise', 'admin']
    },
    _idEntreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise'
    },
    image: String,
    adress: String,
    password: {
        type: String,
        required: true
    },
    description: String,
    linkLinkedin: { 
        type:String, required: true
    },
    linkGithub: String,
    linkWebsite: String,
    linkCV: String,
    image: String,
    skills: [{
        type: String,
        required: true
    }],
    experiences: [{
        type: String,
        required: true
    }],
    diplomas: [{
        type: String,
        required: true
    }],
    languages: [{
        type: String,
        required: true
    }],
    interests: [{
        type: String,
        required: true
    }],
    verified: {
        type: Boolean,
        default: false
    },
    missions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission'
    }],
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
}, 
{
    timestamps: true,
    
} );

module.exports = mongoose.model('User', userSchema);