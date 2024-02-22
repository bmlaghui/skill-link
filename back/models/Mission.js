const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    requiredSkills:{
        type: [String],
        required: true
    },
    entreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise',
        required: true
    },
    isFinalClient: {
        type: Boolean,
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: ['CDD', 'CDI', 'Potage salarial' ]
    },

    tjm: {
        type: Number,
        required: true
    },

    missionEntreprise : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise',
        required: true
    },

    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: Date,
    renumeration: Number,
    previleges: [String],
    status: {
        type: Boolean,
        default: false
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]

}, 
{
    timestamps: true,
    
} );

module.exports = mongoose.model('Mission', missionSchema);