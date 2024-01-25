const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    _idMission: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission',
        required: true
    }],
    coverLetter: String,
    statut: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    _idUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
}, 
{
    timestamps: true,
    
} );

module.exports = mongoose.model('Application', applicationSchema);