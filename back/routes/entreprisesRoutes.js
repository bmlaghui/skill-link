const router = require('express').Router();
const Entreprise = require('../models/Entreprise');
const mongoose = require('mongoose');
const entreprisesController = require('../controllers/EntreprisesController');

router.post('/entreprises', entreprisesController.createEntreprise );

router.get('/entreprises', entreprisesController.getEntreprises);

router.get('/entreprises/:id', entreprisesController.getEntreprise);

router.put('/entreprises/:id', entreprisesController.updateEntreprise);

router.delete('/entreprises/:id', entreprisesController.deleteEntreprise);

module.exports = router;