const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const mongoose = require('mongoose');
const applicationsController = require('../controllers/MissionsController');

router.post('/applications', applicationsController.createMission );

router.get('/applications', applicationsController.getMissions);

router.get('/applications/:id', applicationsController.getMission);

router.put('/applications/:id', applicationsController.updateMission);

router.delete('/applications/:id', applicationsController.deleteMission);


module.exports = router;