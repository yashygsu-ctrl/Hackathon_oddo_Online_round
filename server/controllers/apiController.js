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
  
  // Transition logic: dispatching marks vehicle and driver as On Trip
  await Vehicle.findByIdAndUpdate(vehicle, { status: 'On Trip' });
  await Driver.findByIdAndUpdate(driver, { status: 'On Trip' });

  const newTrip = await Trip.findById(trip._id).populate('vehicle').populate('driver');
  res.status(201).json(newTrip);
});

// @route   DELETE /api/trips/:id
const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (trip && trip.status === 'Dispatched') {
    // Restore vehicle and driver if cancelling a dispatched trip
    await Vehicle.findByIdAndUpdate(trip.vehicle, { status: 'Available' });
    await Driver.findByIdAndUpdate(trip.driver, { status: 'Available' });
  }
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ message: 'Trip removed' });
});

// @route   POST /api/trips/:id/complete
const completeTrip = asyncHandler(async (req, res) => {
  const { finalOdometer, fuelConsumed } = req.body;
  const trip = await Trip.findById(req.params.id).populate('vehicle');
  
  if (!trip) return res.status(404).json({ message: 'Trip not found' });

  trip.status = 'Completed';
  trip.timeInfo = 'Finished';
  await trip.save();

  // Revert vehicle and driver
  await Vehicle.findByIdAndUpdate(trip.vehicle._id, { status: 'Available', odometer: finalOdometer });
  await Driver.findByIdAndUpdate(trip.driver, { status: 'Available' });

  // Record fuel expense
  if (fuelConsumed && Number(fuelConsumed) > 0) {
    const cost = Number(fuelConsumed) * 95; // e.g., 95 per liter
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    await Expense.create({
      type: 'Fuel',
      vehicle: trip.vehicle._id,
      trip: trip._id,
      date: today,
      liters: `${fuelConsumed} L`,
      fuelCost: cost.toString(),
      toll: '0',
      other: '0',
      maintCost: '0'
    });
  }

  const updatedTrip = await Trip.findById(trip._id).populate('vehicle').populate('driver');
  res.json(updatedTrip);
});

// @route   POST /api/maintenance
const addMaintenance = asyncHandler(async (req, res) => {
  const { vehicle, service, cost, date } = req.body;
  const maint = await Maintenance.create({
    vehicle, service, cost, date, status: 'In Shop'
  });
  
  // Automate: Adding vehicle to Maintenance Log switches its status to "In Shop"
  await Vehicle.findByIdAndUpdate(vehicle, { status: 'In Shop' });

  const newMaint = await Maintenance.findById(maint._id).populate('vehicle');
  res.status(201).json(newMaint);
});

// @route   DELETE /api/maintenance/:id
const deleteMaintenance = asyncHandler(async (req, res) => {
  const maint = await Maintenance.findById(req.params.id);
  if (maint) {
    await Vehicle.findByIdAndUpdate(maint.vehicle, { status: 'Available' });
    await Maintenance.findByIdAndDelete(req.params.id);
  }
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
  completeTrip,
  addMaintenance,
  deleteMaintenance,
  addExpense,
  deleteExpense
};
