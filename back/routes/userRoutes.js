const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const usersController = require('../controllers/UsersController');
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Endpoint to get a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Endpoint to get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Endpoint to update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Endpoint to delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The user has been deleted
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user login
 *     tags: [Authentification]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: User logout
 *     description: Endpoint for user logout
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful logout
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/verify/{id}:
 *   post:
 *     summary: Verify user
 *     description: Endpoint for verifying user
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User verified
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/{id}/missions:
 *   get:
 *     summary: Get missions for a user
 *     description: Endpoint to get missions for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of missions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mission'
 */

/**
 * @swagger
 * /users/{id}/missions:
 *   post:
 *     summary: Create a mission for a user
 *     description: Endpoint to create a mission for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mission'
 *     responses:
 *       201:
 *         description: The created mission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mission'
 */

/**
 * @swagger
 * /users/{id}/missions/{idMission}:
 *   put:
 *     summary: Update a mission for a user
 *     description: Endpoint to update a mission for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: idMission
 *         required: true
 *         description: The ID of the mission
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mission'
 *     responses:
 *       200:
 *         description: The updated mission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mission'
 */

/**
 * @swagger
 * /users/{id}/missions/{idMission}:
 *   delete:
 *     summary: Delete a mission for a user
 *     description: Endpoint to delete a mission for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: idMission
 *         required: true
 *         description: The ID of the mission
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The mission has been deleted
 */

/**
 * @swagger
 * /users/{id}/applications:
 *   get:
 *     summary: Get applications for a user
 *     description: Endpoint to get applications for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */

/**
 * @swagger
 * /users/{id}/applications:
 *   post:
 *     summary: Create an application for a user
 *     description: Endpoint to create an application for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
 *         description: The created application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 */

/**
 * @swagger
 * /users/{id}/applications/{idApplication}:
 *   put:
 *     summary: Update an application for a user
 *     description: Endpoint to update an application for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: idApplication
 *         required: true
 *         description: The ID of the application
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       200:
 *         description: The updated application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 */

/**
 * @swagger
 * /users/{id}/applications/{idApplication}:
 *   delete:
 *     summary: Delete an application for a user
 *     description: Endpoint to delete an application for a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: idApplication
 *         required: true
 *         description: The ID of the application
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The application has been deleted
 */
        
router.post('/users', usersController.createUser );

router.get('/users', verifyToken, usersController.getUsers);

router.get('/users/:id', verifyToken, usersController.getUser);

router.put('/users/:id', verifyToken, usersController.updateUser);

router.delete('/users/:id', verifyToken, usersController.deleteUser);

//Authentification routes
router.post('/login', usersController.login);
router.get('/logout', verifyToken, usersController.logout)
router.post('/users/verify/:id', verifyToken, usersController.verify)
router.get('/refresh_token', usersController.refreshToken)

// Missions of a user
router.get('/users/:id/missions', verifyToken, usersController.getMissions);
router.post('/users/:id/missions', verifyToken, usersController.createMission);
router.put('/users/:id/missions/:idMission', verifyToken, usersController.updateMission);
router.delete('/users/:id/missions/:idMission', verifyToken, usersController.deleteMission);

// Applications of a user
router.get('/users/:id/applications', verifyToken, usersController.getApplications);
router.post('/users/:id/applications', verifyToken, usersController.createApplication);
router.put('/users/:id/applications/:idApplication', verifyToken, usersController.updateApplication);
router.delete('/users/:id/applications/:idApplication', verifyToken, usersController.deleteApplication);

//Get Users by role
router.get('/users/role/:role', verifyToken, usersController.getUsersByRole);
module.exports = router;