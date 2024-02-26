const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    coverLetter: String,
    statut: {
        type: String,
        enum: ["received", "under_review", "in_progress", "shortlisted", "interview_scheduled", "interviewed", "pending_decision", "offer_extended", "offer_accepted", "offer_declined", "withdrawn", "not_selected", "on_hold", "hired"],
        default: 'received'
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission',
        required: true
    }
}, 
{
    timestamps: true,
    
} );

module.exports = mongoose.model('Application', applicationSchema);