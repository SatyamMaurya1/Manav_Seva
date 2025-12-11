const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// About Us
const { getAboutUs, createOrUpdateAboutUs, deleteAboutUs } = require('../controllers/aboutUsController');
router.get('/about-us', getAboutUs);
router.post('/about-us', authMiddleware, createOrUpdateAboutUs);
router.delete('/about-us', authMiddleware, deleteAboutUs);

// Governance
const { getGovernance, createOrUpdateGovernance, deleteGovernance } = require('../controllers/governanceController');
router.get('/governance', getGovernance);
router.post('/governance', authMiddleware, createOrUpdateGovernance);
router.delete('/governance', authMiddleware, deleteGovernance);

// Geographic Focus
const { getGeographicFocus, createOrUpdateGeographicFocus, deleteGeographicFocus } = require('../controllers/geographicFocusController');
router.get('/geographic-focus', getGeographicFocus);
router.post('/geographic-focus', authMiddleware, createOrUpdateGeographicFocus);
router.delete('/geographic-focus', authMiddleware, deleteGeographicFocus);

// Organization Structure
const { getOrganizationStructure, createOrUpdateOrganizationStructure, deleteOrganizationStructure } = require('../controllers/organizationStructureController');
router.get('/organization-structure', getOrganizationStructure);
router.post('/organization-structure', authMiddleware, createOrUpdateOrganizationStructure);
router.delete('/organization-structure', authMiddleware, deleteOrganizationStructure);

// Messages
const { getMessages, createOrUpdateMessage, deleteMessage } = require('../controllers/messageController');
router.get('/messages', getMessages);
router.post('/messages', authMiddleware, createOrUpdateMessage);
router.delete('/messages/:id', authMiddleware, deleteMessage);

module.exports = router;
