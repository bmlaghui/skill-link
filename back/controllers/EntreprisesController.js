const Entreprise = require('../models/Entreprise');
const mongoose = require('mongoose');

exports.createEntreprise = async (req, res) => {
    try {
        if(!req.body.name) {
            return res.status(422).json({ err: 'Name is required'  });
        }
        if(!req.body.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Entreprise.schema.path('category').enumValues.includes(req.body.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Entreprise.schema.path('category').enumValues}` });
        }
        const entreprise = new Entreprise(req.body);
        await entreprise.save();
        return res.status(201).json({ msg: 'Entreprise created successfully'});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ err });
    }
};

exports.getEntreprises = async (req, res) => {
    try {
        const entreprises = await Entreprise.find({}, { __v: 0, _id: 0 });
        return res.json(entreprises);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getEntreprise = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Entreprise ID' });
        }
        const entreprise = await Entreprise.findById(req.params.id, { __v: 0, _id: 0 });
        return res.json(entreprise);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.updateEntreprise = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Entreprise ID' });
        }
        if(!req.body.name) {
            return res.status(422).json({ err: 'Name is required'  });
        }
        if(!req.body.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Entreprise.schema.path('category').enumValues.includes(req.body.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Entreprise.schema.path('category').enumValues}` });
        }

        const entreprise = await Entreprise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({ msg: 'Entreprise updated successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.deleteEntreprise = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Entreprise ID' });
        }
        await Entreprise.findByIdAndRemove(req.params.id);
        return res.json({ msg: 'Entreprise deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.createMission = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Entreprise ID' });
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
        else if(!Entreprise.schema.path('category').enumValues.includes(req.body.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Entreprise.schema.path('category').enumValues}` });
        }
        if(!req.body.tjm) {
            return res.status(422).json({ err: 'TJM is required' });
        }
        if(!req.body.dateDebut) {
            return res.status(422).json({ err: 'Date de debut is required' });
        }
        const entreprise = await Entreprise.findById(req.params.id);
        entreprise.missions.push(req.body);
        await entreprise.save();
        return res.json({ msg: 'Mission added successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getMissions = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Entreprise ID' });
        }
        const entreprise = await Entreprise.findById(req.params.id, { __v: 0, _id: 0 }).populate('missions');
        return res.json(entreprise.missions);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getMission = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid Mission ID' });
        }
        const entreprise = await Entreprise.findById(req.params.id, { __v: 0, _id: 0 });
        return res.json(entreprise.missions);
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
        if(!req.body._idEntreprise) {
            return res.status(422).json({ err: 'Entreprise is required' });
        }
        if(!req.body.isFinalClient) {
            return res.status(422).json({ err: 'isFinalClient is required' });
        }
        if(!req.body.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Entreprise.schema.path('category').enumValues.includes(req.body.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Entreprise.schema.path('category').enumValues}` });
        }
        if(!req.body.tjm) {
            return res.status(422).json({ err: 'TJM is required' });
        }
        if(!req.body.dateDebut) {
            return res.status(422).json({ err: 'Date de debut is required' });
        }
        const entreprise = await Entreprise.findById(req.params.id);
        const mission = entreprise.missions.id(req.body._idMission);
        mission.set(req.body);
        await entreprise.save();
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
        if(!req.body._idMission) {
            return res.status(422).json({ err: 'Mission is required' });
        }
        const entreprise = await Entreprise.findById(req.params.id);
        entreprise.missions.pull(req.body._idMission);
        await entreprise.save();
        return res.json({ msg: 'Mission deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getEntreprisesByCategoryStat = async (req, res) => {
    try {
        const entreprises = await Entreprise.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);
        return res.json(entreprises);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}
