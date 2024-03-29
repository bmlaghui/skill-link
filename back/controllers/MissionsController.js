const Mission = require('../models/Mission');
const mongoose = require('mongoose');

exports.createMission = async (req, res) => {
    try {
        if(!req.body.requiredSkills) {
            return res.status(422).json({ err: 'required Skills are required'  });
        }
        if(!req.body._idEntreprise) {
            return res.status(422).json({ err: 'Entreprise is required' });
        }
        if(!req.body.isFinalClient) {
            return res.status(422).json({ err: 'isFinalClient is required' });
        }
        if(!req.body.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Mission.schema.path('category').enumValues.includes(req.body.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Mission.schema.path('category').enumValues}` });
        }
        if(!req.body.tjm) {
            return res.status(422).json({ err: 'TJM is required' });
        }
        if(!req.body.dateDebut) {
            return res.status(422).json({ err: 'Date de debut is required' });
        }

        const mission = new Mission(req.body);
        await mission.save();
        return res.status(201).json({Mission, msg: 'Mission created successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getMissions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Page number, default is 1
        const limit = parseInt(req.query.limit) || 10; // Number of documents per page, default is 10

        const skip = (page - 1) * limit; // Number of documents to skip

        const totalMissionsCount = await Mission.countDocuments(); // Total number of Missions

        const missions = await Mission.find({}, { __v: 0, _id: 0 })
                                      .skip(skip)
                                      .limit(limit)
                                      .populate('entreprise', '-_id -__v') // Exclude _id and __v fields from populated enterprise
                                      .populate('applications', '-_id -__v')
                                      .populate('missionEntreprise', '-_id -__v');


        return res.json({
            currentPage: page,
            totalPages: Math.ceil(totalMissionsCount / limit),
            totalMissionsCount: totalMissionsCount,
            missions
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


exports.getMission = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Mission ID' });
        }
        
        const mission = await Mission.findById(req.params.id, { __v: 0, _id: 0 });
        return res.json(mission);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.updateMission = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Mission ID' });
        }
        if(!req.body.requiredSkills) {
            return res.status(422).json({ err: 'required Skills are required'  });
        }
        if(!req.body._idEntreprise) {
            return res.status(422).json({ err: 'Entreprise is required' });
        }
        if(!req.body.isFinalClient) {
            return res.status(422).json({ err: 'isFinalClient is required' });
        }
        if(!req.body.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Mission.schema.path('category').enumValues.includes(req.body.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Mission.schema.path('category').enumValues}` });
        }
        if(!req.body.tjm) {
            return res.status(422).json({ err: 'TJM is required' });
        }
        if(!req.body.dateDebut) {
            return res.status(422).json({ err: 'Date de debut is required' });
        }
        // On ne peut pas modifier l'ID d'une mission
        delete req.body._id;
        let updated = await Mission.findByIdAndUpdate(req.params.id, req.
        body, { new: true, runValidators: true });
        return res.json({ msg: 'Mission updated successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};


exports.deleteMission = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Mission ID' });
        }
        await Mission.findByIdAndRemove(req.params.id);
        return res.json({ msg: 'Mission deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getMissionsByCategoryStat = async (req, res) => {
    try {
        const missions = await Mission.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);
        return res.json(missions);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.getCandidateCounts = async (req, res) => {
    try {
        const mission = await Mission.findOne({}); // You may need to adjust the query based on your actual requirements
        if (!mission) {
            return res.status(404).json({ error: 'No mission found' });
        }

        const candidateCount = mission.candidates.length;
        const selectedCandidateCount = mission.selectedCandidates.length;
        const rejectedCandidateCount = mission.rejectedCandidates.length;
        const pendingCandidateCount = mission.pendingCandidates.length;
        const retainedCandidateCount = mission.retainedCandidates.length;

        res.json({
            candidateCount,
            selectedCandidateCount,
            rejectedCandidateCount,
            pendingCandidateCount,
            retainedCandidateCount
        });
    } catch (error) {
        console.error('Error fetching candidate counts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
