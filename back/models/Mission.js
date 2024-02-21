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
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    selectedCandidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    rejectedCandidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    pendingCandidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    retainedCandidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, 
{
    timestamps: true,
    
} );

module.exports = mongoose.model('Mission', missionSchema);