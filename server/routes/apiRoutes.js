const express = require('express');
const router = express.Router();
const { 
  getVehicles, getDrivers, getTrips, getMaintenance, getExpenses, 
  addTrip, addMaintenance, addVehicle, deleteVehicle, 
  addDriver, deleteDriver, deleteTrip, addExpense, deleteMaintenance, deleteExpense
} = require('../controllers/apiController');
const { protect } = require('../middleware/authMiddleware');

router.get('/vehicles', protect, getVehicles);
router.post('/vehicles', protect, addVehicle);
router.delete('/vehicles/:id', protect, deleteVehicle);

router.get('/drivers', protect, getDrivers);
router.post('/drivers', protect, addDriver);
router.delete('/drivers/:id', protect, deleteDriver);

router.get('/trips', protect, getTrips);
router.post('/trips', protect, addTrip);
router.delete('/trips/:id', protect, deleteTrip);

router.get('/maintenance', protect, getMaintenance);
router.post('/maintenance', protect, addMaintenance);
router.delete('/maintenance/:id', protect, deleteMaintenance);

router.get('/expenses', protect, getExpenses);
router.post('/expenses', protect, addExpense);
router.delete('/expenses/:id', protect, deleteExpense);

module.exports = router;
