const express = require('express');
const router = express.Router();
const Entreprise = require('../models/Entreprise');
const mongoose = require('mongoose');
const entreprisesController = require('../controllers/EntreprisesController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/entreprises', verifyToken, entreprisesController.createEntreprise );

router.get('/entreprises', verifyToken, entreprisesController.getEntreprises);

router.get('/entreprises/:id', verifyToken, entreprisesController.getEntreprise);

router.put('/entreprises/:id', verifyToken, entreprisesController.updateEntreprise);

router.delete('/entreprises/:id', verifyToken, entreprisesController.deleteEntreprise);

router.get('/entreprises/:id/missions', verifyToken, entreprisesController.getMissions);
router.post('/entreprises/:id/missions', verifyToken, entreprisesController.createMission);
router.put('/entreprises/:id/missions/:idMission', verifyToken, entreprisesController.updateMission);
router.delete('/entreprises/:id/missions/:idMission', verifyToken, entreprisesController.deleteMission);

module.exports = router;