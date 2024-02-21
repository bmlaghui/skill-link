const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const mongoose = require('mongoose');
const logsController = require('../controllers/LogsController');

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: API endpoints for displaying logs
 */


/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get a list of logs
 *     description: Endpoint to get a list of logs
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */

// Get a list of logs
router.get('/logs', logsController.getLogs);

module.exports = router;