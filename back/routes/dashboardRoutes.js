const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const usersController = require('../controllers/UsersController');
const entreprisesController = require('../controllers/EntreprisesController');
const missionsController = require('../controllers/MissionsController');
const applicationsController = require('../controllers/ApplicationsController'); 
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
router.get('/dashboard_entreprises_by_category', verifyToken, entreprisesController.getEntreprisesByCategoryStat);
router.get('/dashboard_missions_by_category', verifyToken, missionsController.getMissionsByCategoryStat);
router.get('/dashboard_applications_by_status', verifyToken, applicationsController.getApplicationsByStatusStat);
router.get('/dashboard_candidates_last6months', verifyToken, usersController.getNbCandidatesInLastSixMonths);
router.get('/dashboard_admins_last6months', verifyToken, usersController.getNbAdminsInLastSixMonths);
router.get('/dashboard_entreprises_last6months', verifyToken, usersController.getNbEntreprisesInLastSixMonths);



module.exports = router;