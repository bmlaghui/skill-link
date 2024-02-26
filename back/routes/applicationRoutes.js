const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const mongoose = require('mongoose');
const applicationsController = require('../controllers/ApplicationsController');
const verifyToken = require('../middleware/authMiddleware');


router.get('/applications', verifyToken, applicationsController.getApplications);

router.get('/applications/:id', verifyToken, applicationsController.getApplication);

router.put('/applications/:id', verifyToken, applicationsController.updateApplication);

router.delete('/applications/:id', verifyToken, applicationsController.deleteApplication);




module.exports = router;