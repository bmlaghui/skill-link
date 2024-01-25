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
        return res.status(201).json(entreprise);
    }
    catch (err) {
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
        return res.json({ msg: 'Entreprise updated successfully', entreprise});
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

exports.getEntreprisesByCategory = async (req, res) => {
    try {
        if(!req.query.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Entreprise.schema.path('category').enumValues.includes(req.query.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Entreprise.schema.path('category').enumValues}` });
        }
        const entreprises = await Entreprise.find({ category: req.query.category }, { __v: 0, _id: 0 });
        return res.json({ msg : `List of ${req.query.category} entreprises`, entreprises});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getEntreprisesByCategoryAndName = async (req, res) => {
    try {
        if(!req.query.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Entreprise.schema.path('category').enumValues.includes(req.query.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Entreprise.schema.path('category').enumValues}` });
        }
        if(!req.query.name) {
            return res.status(422).json({ err: 'Name is required' });
        }
        const entreprises = await Entreprise.find({ category: req.query.category, name: { $regex: req.query.name, $options: 'i' } }, { __v: 0, _id: 0 });
        return res.json(entreprises);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getEntreprisesByCategoryAndAdress = async (req, res) => {
    try {
        if(!req.query.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Entreprise.schema.path('category').enumValues.includes(req.query.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Entreprise.schema.path('category').enumValues}` });
        }
        if(!req.query.adress) {
            return res.status(422).json({ err: 'Adress is required' });
        }
        const entreprises = await Entreprise.find({ category: req.query.category, adress: { $regex: req.query.adress, $options: 'i' } }, { __v: 0, _id: 0 });
        return res.json(entreprises);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getEntreprisesByCategoryAndNameAndAdress = async (req, res) => {
    try {
        if(!req.query.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Entreprise.schema.path('category').enumValues.includes(req.query.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Entreprise.schema.path('category').enumValues}` });
        }
        if(!req.query.name) {
            return res.status(422).json({ err: 'Name is required' });
        }
        if(!req.query.adress) {
            return res.status(422).json({ err: 'Adress is required' });
        }
        const entreprises = await Entreprise.find({ category: req.query.category, name: { $regex: req.query.name, $options: 'i' }, adress: { $regex: req.query.adress, $options: 'i' } }, { __v: 0, _id: 0 });
        return res.json(entreprises);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getEntreprisesByCategoryAndNameAndAdressAndDescription = async (req, res) => {
    try {
        if(!req.query.category) {
            return res.status(422).json({ err: 'Category is required' });
        }
        else if(!Entreprise.schema.path('category').enumValues.includes(req.query.category)) {
            return res.status(422).json({ err: `Category is not valid. It must be one of theese options: ${Entreprise.schema.path('category').enumValues}` });
        }
        if(!req.query.name) {
            return res.status(422).json({ err: 'Name is required' });
        }
        if(!req.query.adress) {
            return res.status(422).json({ err: 'Adress is required' });
        }
        if(!req.query.description) {
            return res.status(422).json({ err: 'Description is required' });
        }
        const entreprises = await Entreprise.find({ category: req.query.category, name: { $regex: req.query.name, $options: 'i' }, adress: { $regex: req.query.adress, $options: 'i' }, description: { $regex: req.query.description, $options: 'i' } }, { __v: 0, _id: 0 });
        return res.json(entreprises);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

