const express = require('express');
const router = express.Router();
const Entreprise = require('../models/Entreprise');
const mongoose = require('mongoose');
const entreprisesController = require('../controllers/EntreprisesController');

router.post('/entreprises', entreprisesController.createEntreprise );

router.get('/entreprises', entreprisesController.getEntreprises);

router.get('/entreprises/:id', entreprisesController.getEntreprise);

router.put('/entreprises/:id', entreprisesController.updateEntreprise);

router.delete('/entreprises/:id', entreprisesController.deleteEntreprise);

router.get('/entreprises/:id/missions', entreprisesController.getMissions);
router.post('/entreprises/:id/missions', entreprisesController.createMission);
router.put('/entreprises/:id/missions/:idMission', entreprisesController.updateMission);
router.delete('/entreprises/:id/missions/:idMission', entreprisesController.deleteMission);

module.exports = router;