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
    _idEntreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'entreprise',
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

    _idMissionEntreprise : mongoose.Schema.Types.ObjectId,

    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: Date,
    renumeration: Number,
    previleges: [String],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    }
    // candidats: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'candidat'
    // }],
    // candidatsSelectionnes: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'candidat'
    // }],
    // candidatsRefuses: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'candidat'
    // }],
    // candidatsEnAttente: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'candidat'
    // }],
    // candidatsRetenus: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'candidat'
    // }],




}, 
{
    timestamps: true,
    
} );

module.exports = mongoose.model('mission', missionSchema);