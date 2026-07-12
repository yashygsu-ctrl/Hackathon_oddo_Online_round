const express = require('express');
const router = express.Router();
const { 
  getVehicles, addVehicle, deleteVehicle,
  getDrivers, addDriver, deleteDriver,
  getTrips, addTrip, deleteTrip, completeTrip,
  getMaintenance, addMaintenance, deleteMaintenance,
  getExpenses, addExpense, deleteExpense
} = require('../controllers/apiController');
const { protect } = require('../middleware/authMiddleware');

router.get('/vehicles', protect, getVehicles);
router.post('/vehicles', protect, addVehicle);
router.delete('/vehicles/:id', protect, deleteVehicle);

router.get('/drivers', protect, getDrivers);
router.post('/drivers', protect, addDriver);
router.delete('/drivers/:id', protect, deleteDriver);

router.route('/trips').get(protect, getTrips).post(protect, addTrip);
router.route('/trips/:id').delete(protect, deleteTrip);
router.route('/trips/:id/complete').post(protect, completeTrip);

router.get('/maintenance', protect, getMaintenance);
router.post('/maintenance', protect, addMaintenance);
router.delete('/maintenance/:id', protect, deleteMaintenance);

router.get('/expenses', protect, getExpenses);
router.post('/expenses', protect, addExpense);
router.delete('/expenses/:id', protect, deleteExpense);

module.exports = router;
