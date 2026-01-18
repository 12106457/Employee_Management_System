const express = require('express');
const { upload, processImage } = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/auth');
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

// Apply auth middleware to all employee routes
router.use(authMiddleware);

router.get('/', getAllEmployees);
router.post('/', upload, processImage, createEmployee);
router.put('/:id', upload, processImage, updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
