const Mission = require('../models/Mission');
const Application = require('../models/Application');
const mongoose = require('mongoose');

exports.createUser = async (req, res) => {
    try {
        if(!req.body.firstName) {
            return res.status(422).json({ err: 'first name is required'  });
        }
        if(!req.body.lastName) {
            return res.status(422).json({ err: 'last name is required' });
        }
        if(!req.body.email) {
            return res.status(422).json({ err: 'email is required' });
        }
        if(!req.body.role) {
            return res.status(422).json({ err: 'role is required' });
        }
        else if(!User.schema.path('role').enumValues.includes(req.body.role)) {
            return res.status(422).json({ err: `role is not valid. It must be one of theese options: ${User.schema.path('role').enumValues}` });
        }
        if(!req.body.phoneNumber) {
            return res.status(422).json({ err: 'phone number is required' });
        }
        if(!req.body.password) {
            return res.status(422).json({ err: 'password is required' });
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const user = new User(req.body);

        await user.save();
        return res.status(201).json({User, msg: 'User created successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const Users = await User.find({}, { __v: 0, _id: 0, password: 0});
        return res.json(Users);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getUser = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid User ID' });
        }
        
        const user = await User.findById(req.params.id, { __v: 0, _id: 0, password: 0 });
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.updateUser = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid User ID' });
        }
        if(!req.body.firstName) {
            return res.status(422).json({ err: 'first name is required'  });
        }
        if(!req.body.lastName) {
            return res.status(422).json({ err: 'last name is required' });
        }
        if(!req.body.email) {
            return res.status(422).json({ err: 'email is required' });
        }
        if(!req.body.role) {
            return res.status(422).json({ err: 'role is required' });
        }
        else if(!User.schema.path('role').enumValues.includes(req.body.role)) {
            return res.status(422).json({ err: `role is not valid. It must be one of theese options: ${User.schema.path('role').enumValues}` });
        }
        if(!req.body.phoneNumber) {
            return res.status(422).json({ err: 'phone number is required' });
        }
        if(!req.body.password) {
            return res.status(422).json({ err: 'password is required' });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // On ne peut pas modifier l'ID d'une user
        delete req.body._id;
        let updated = await User.findByIdAndUpdate(req.params.id, req.
        body, { new: true, runValidators: true });
        return res.json({ msg: 'User updated successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid User ID' });
        }
        await User.findByIdAndRemove(req.params.id);
        return res.json({ msg: 'User deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};

exports.getMissions = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid User ID' });
        }
        const user = await User.findById(req.params.id).populate('missions');
        
        return res.json(user.missions);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}

exports.createMission = async (req, res) => {  
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid User ID' });
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
        const mission = new Mission(req.body);
        await mission.save();
        await User.findByIdAndUpdate(req.params.id, { $push: { missions: mission._id } });
        return res.status(201).json({ mission, msg: 'Mission created successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}

exports.deleteMission = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid User ID' });
        }
        if(!mongoose.isValidObjectId(req.params.idMission)) {
            return res.status(422).json({ err: 'Invalid Mission ID' });
        }
        await User.findByIdAndUpdate(req.params.id, { $pull: { missions: req.params.idMission } });
        await Mission.findByIdAndRemove(req.params.idMission);
        return res.json({ msg: 'Mission deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}

exports.updateMission = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid User ID' });
        }
        if(!mongoose.isValidObjectId(req.params.idMission)) {
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
        await Mission.findByIdAndUpdate(req.params.idMission, req.body, { new: true });
        return res.json({ msg: 'Mission updated successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}

exports.getApplications = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(422).json({ err: 'Invalid User ID' });
        }
        const user = await User.findById(req.params.id).populate('applications');
        
        return res.json(user.applications);
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}

exports.createApplication = async (req, res) => {  
    try {
        if(!mongoose.isValidObjectId(req.params.idMission)) {
            return res.status(422).json({ err: 'Invalid Mission ID' });
        }
        if(!req.body._idUser) {
            return res.status(422).json({ err: 'User is required' });
        }
        if(!req.body.status) {
            return res.status(422).json({ err: 'Status is required' });
        }
        else if(!Application.schema.path('status').enumValues.includes(req.body.status)) {
            return res.status(422).json({ err: `Status is not valid. It must be one of theese options: ${Application.schema.path('status').enumValues}` });
        }
        const application = new Application(req.body);
        await application.save();
        await Mission.findByIdAndUpdate(req.params.idMission, { $push: { applications: application._id } });
        return res.status(201).json({ application, msg: 'Application created successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}

exports.deleteApplication = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.idMission)) {
            return res.status(422).json({ err: 'Invalid Mission ID' });
        }
        if(!mongoose.isValidObjectId(req.params.idApplication)) {
            return res.status(422).json({ err: 'Invalid Application ID' });
        }
        await Mission.findByIdAndUpdate(req.params.idMission, { $pull: { applications: req.params.idApplication } });
        await Application.findByIdAndRemove(req.params.idApplication);
        return res.json({ msg: 'Application deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}

exports.updateApplication = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.idMission)) {
            return res.status(422).json({ err: 'Invalid Mission ID' });
        }
        if(!mongoose.isValidObjectId(req.params.idApplication)) {
            return res.status(422).json({ err: 'Invalid Application ID' });
        }
        if(!req.body._idUser) {
            return res.status(422).json({ err: 'User is required' });
        }
        if(!req.body.status) {
            return res.status(422).json({ err: 'Status is required' });
        }
        else if(!Application.schema.path('status').enumValues.includes(req.body.status)) {
            return res.status(422).json({ err: `Status is not valid. It must be one of theese options: ${Application.schema.path('status').enumValues}` });
        }
        await Application.findByIdAndUpdate(req.params.idApplication, req.body, { new: true });
        return res.json({ msg: 'Application updated successfully'});
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}



const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model

// Login a user
exports.login = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(422).json({ err: 'email is required' });
        }
        if (!req.body.password) {
            return res.status(422).json({ err: 'password is required' });
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(422).json({ err: 'email is not valid' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(422).json({ err: 'password is not valid' });
        }

        const token = (require('jsonwebtoken')).sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        // Send the token in the response
        return res.json({ msg: 'User logged in successfully', token: token });
    } catch (err) {
        return res.status(500).json({ err: err });
    }
};


exports.logout = async (req, res) => {
    try{
        return res.json({ msg: 'User logged out successfully' });
    }
    catch(err) {
        return res.status(500).json({ err });
    }
}



