const asyncHandler = require('express-async-handler');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const Maintenance = require('../models/Maintenance');
const Expense = require('../models/Expense');

// @route   GET /api/vehicles
const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({});
  res.json(vehicles);
});

// @route   GET /api/drivers
const getDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find({});
  res.json(drivers);
});

// @route   GET /api/trips
const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({}).populate('vehicle').populate('driver');
  res.json(trips);
});

// @route   GET /api/maintenance
const getMaintenance = asyncHandler(async (req, res) => {
  const maintenance = await Maintenance.find({}).populate('vehicle');
  res.json(maintenance);
});

// @route   GET /api/expenses
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({}).populate('vehicle').populate('trip');
  res.json(expenses);
});

// @route   POST /api/vehicles
const addVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json(vehicle);
});

// @route   DELETE /api/vehicles/:id
const deleteVehicle = asyncHandler(async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ message: 'Vehicle removed' });
});

// @route   POST /api/drivers
const addDriver = asyncHandler(async (req, res) => {
  const driver = await Driver.create(req.body);
  res.status(201).json(driver);
});

// @route   DELETE /api/drivers/:id
const deleteDriver = asyncHandler(async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.json({ message: 'Driver removed' });
});

// @route   POST /api/trips
const addTrip = asyncHandler(async (req, res) => {
  const { tripId, source, destination, vehicle, driver, weight, distance } = req.body;
  const trip = await Trip.create({
    tripId, source, destination, vehicle, driver, weight, distance, status: 'Dispatched', timeInfo: 'Just now'
  });
  const newTrip = await Trip.findById(trip._id).populate('vehicle').populate('driver');
  res.status(201).json(newTrip);
});

// @route   DELETE /api/trips/:id
const deleteTrip = asyncHandler(async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ message: 'Trip removed' });
});

// @route   POST /api/maintenance
const addMaintenance = asyncHandler(async (req, res) => {
  const { vehicle, service, cost, date } = req.body;
  const maint = await Maintenance.create({
    vehicle, service, cost, date, status: 'In Shop'
  });
  const newMaint = await Maintenance.findById(maint._id).populate('vehicle');
  res.status(201).json(newMaint);
});

// @route   DELETE /api/maintenance/:id
const deleteMaintenance = asyncHandler(async (req, res) => {
  await Maintenance.findByIdAndDelete(req.params.id);
  res.json({ message: 'Maintenance record removed' });
});

// @route   POST /api/expenses
const addExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.create(req.body);
  res.status(201).json(expense);
});

// @route   DELETE /api/expenses/:id
const deleteExpense = asyncHandler(async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense removed' });
});

module.exports = {
  getVehicles,
  getDrivers,
  getTrips,
  getMaintenance,
  getExpenses,
  addVehicle,
  deleteVehicle,
  addDriver,
  deleteDriver,
  addTrip,
  deleteTrip,
  addMaintenance,
  deleteMaintenance,
  addExpense,
  deleteExpense
};
