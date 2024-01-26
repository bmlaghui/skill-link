const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const usersController = require('../controllers/UsersController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/users', usersController.createUser );

router.get('/users', verifyToken, usersController.getUsers);

router.get('/users/:id', verifyToken, usersController.getUser);

router.put('/users/:id', verifyToken, usersController.updateUser);

router.delete('/users/:id', verifyToken, usersController.deleteUser);

//Authentification routes
router.post('/login', usersController.login);
router.get('/logout', verifyToken, usersController.logout)

// Missions of a user
router.get('/users/:id/missions', verifyToken, usersController.getMissions);
router.post('/users/:id/missions', verifyToken, usersController.createMission);
router.put('/users/:id/missions/:idMission', verifyToken, usersController.updateMission);
router.delete('/users/:id/missions/:idMission', verifyToken, usersController.deleteMission);

// Applications of a user
router.get('/users/:id/applications', verifyToken, usersController.getApplications);
router.post('/users/:id/applications', verifyToken, usersController.createApplication);
router.put('/users/:id/applications/:idApplication', verifyToken, usersController.updateApplication);
router.delete('/users/:id/applications/:idApplication', verifyToken, usersController.deleteApplication);

module.exports = router;