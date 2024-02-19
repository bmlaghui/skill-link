const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const mongoose = require('mongoose');
const applicationsController = require('../controllers/MissionsController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/applications', verifyToken, applicationsController.createMission );

router.get('/applications', verifyToken, applicationsController.getMissions);

router.get('/applications/:id', verifyToken, applicationsController.getMission);

router.put('/applications/:id', verifyToken, applicationsController.updateMission);

router.delete('/applications/:id', verifyToken, applicationsController.deleteMission);




module.exports = router;