const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const usersController = require('../controllers/UsersController');
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: API endpoint for the dashboard
 */


        
router.get('/dashboard_candidates', verifyToken, usersController.getNbCandidatesInLastSixMonths);
router.get('/dashboard_admins', verifyToken, usersController.getNbAdminsInLastSixMonths);
router.get('/dashboard_entreprises', verifyToken, usersController.getNbEntreprisesInLastSixMonths);
router.get('/dashboard_registrations', verifyToken, usersController.getRegistrationInfo);
router.get('/dashboard_users_by_role', verifyToken, usersController.getUsersByRoleStat);

module.exports = router;