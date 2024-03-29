const Application = require('../models/Application');
const mongoose = require('mongoose');

exports.createApplication = async (req, res) => {
    try {
        if(!req.body._idMission) {
            return res.status(422).json({ err: 'Mission is required'  });
        }
        if(!req.body._idUser) {
            return res.status(422).json({ err: 'Candidat is required' });
        }
    
        const application = new Application(req.body);
        await application.save();
        return res.status(201).json({msg: 'Application created successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getApplications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Page number, default is 1
        const limit = parseInt(req.query.limit) || 10; // Number of documents per page, default is 10

        const skip = (page - 1) * limit; // Number of documents to skip

        const totalApplicationsCount = await Application.countDocuments(); // Total number of Applications

        const applications = await Application.find({}, { __v: 0, _id: 0 })
                                      .skip(skip)
                                      .limit(limit)
                                      .populate('candidate', '-_id -__v') // Exclude _id and __v fields from populated candidate
                                      .populate('mission', '-_id -__v');

        return res.json({
            currentPage: page,
            totalPages: Math.ceil(totalApplicationsCount / limit),
            totalApplicationsCount: totalApplicationsCount,
            applications
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getApplication = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Application ID' });
        }
        
        const application = await Application.findById(req.params.id, { __v: 0, _id: 0 });
        return res.json(application);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.updateApplication = async (req, res) => {
    try {
        if(!req.body._idMission) {
            return res.status(422).json({ err: 'Mission is required'  });
        }
        if(!req.body._idUser) {
            return res.status(422).json({ err: 'Candidat is required' });
        }
        // On ne peut pas modifier l'ID d'une application
        delete req.body._id;
        let updated = await Application.findByIdAndUpdate(req.params.id, req.
        body, { new: true, runValidators: true });
        return res.json({ msg: 'Application updated successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};


exports.deleteApplication = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Application ID' });
        }
        await Application.findByIdAndRemove(req.params.id);
        return res.json({ msg: 'Application deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getApplicationsByStatusStat = async (req, res) => {
    try {
        const stats = await Application.aggregate([
            {
                $group: {
                    _id: "$statut",
                    count: { $sum: 1 }
                }
            }
        ]);
        return res.json(stats);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};



