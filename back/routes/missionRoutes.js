const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission');
const mongoose = require('mongoose');
const missionsController = require('../controllers/MissionsController');

router.post('/missions', missionsController.createMission );

router.get('/missions', missionsController.getMissions);

router.get('/missions/:id', missionsController.getMission);

router.put('/missions/:id', missionsController.updateMission);

router.delete('/missions/:id', missionsController.deleteMission);


module.exports = router;