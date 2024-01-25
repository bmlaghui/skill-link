const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const usersController = require('../controllers/UsersController');

router.post('/users', usersController.createUser );

router.get('/users', usersController.getUsers);

router.get('/users/:id', usersController.getUser);

router.put('/users/:id', usersController.updateUser);

router.delete('/users/:id', usersController.deleteUser);

// Missions of a user
router.get('/users/:id/missions', usersController.getMissions);
router.post('/users/:id/missions', usersController.createMission);
router.put('/users/:id/missions/:idMission', usersController.updateMission);
router.delete('/users/:id/missions/:idMission', usersController.deleteMission);

// Applications of a user
router.get('/users/:id/applications', usersController.getApplications);
router.post('/users/:id/applications', usersController.createApplication);
router.put('/users/:id/applications/:idApplication', usersController.updateApplication);
router.delete('/users/:id/applications/:idApplication', usersController.deleteApplication);

module.exports = router;