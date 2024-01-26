const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission');
const mongoose = require('mongoose');
const missionsController = require('../controllers/MissionsController');

const verifyToken = require('../middleware/authMiddleware');

router.post('/missions', verifyToken, missionsController.createMission );

router.get('/missions', verifyToken, missionsController.getMissions);

router.get('/missions/:id', verifyToken, missionsController.getMission);

router.put('/missions/:id', verifyToken, missionsController.updateMission);

router.delete('/missions/:id', verifyToken, missionsController.deleteMission);


module.exports = router;