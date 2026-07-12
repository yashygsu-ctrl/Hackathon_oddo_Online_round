const User = require('./models/User');
const Vehicle = require('./models/Vehicle');
const Driver = require('./models/Driver');
const Trip = require('./models/Trip');
const Maintenance = require('./models/Maintenance');
const Expense = require('./models/Expense');
const bcrypt = require('bcryptjs');

const runSeeder = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already seeded!');
      return;
    }

    console.log('Seeding initial data...');

    // 1. Create Users
    const users = [
      { name: 'Fleet Manager', email: 'manager@transitops.com', password: 'password123', role: 'Fleet Manager' },
      { name: 'Dispatcher', email: 'dispatcher@transitops.com', password: 'password123', role: 'Dispatcher' },
      { name: 'Safety Officer', email: 'safety@transitops.com', password: 'password123', role: 'Safety Officer' },
      { name: 'Financial Analyst', email: 'finance@transitops.com', password: 'password123', role: 'Financial Analyst' },
    ];
    for (const u of users) {
      await User.create(u);
    }

    // 2. Create Vehicles
    const vehicles = await Vehicle.insertMany([
      { regNo: 'GJ01AB4521', model: 'VAN-05', type: 'Van', capacity: '500 kg', odometer: '74,000', cost: '6,20,000', status: 'Available' },
      { regNo: 'GJ01AB9981', model: 'TRUCK-11', type: 'Truck', capacity: '5 Ton', odometer: '182,000', cost: '24,50,000', status: 'On Trip' },
      { regNo: 'GJ01AB1120', model: 'MINI-03', type: 'Mini', capacity: '1 Ton', odometer: '66,000', cost: '4,10,000', status: 'In Shop' },
      { regNo: 'GJ01AB008',  model: 'VAN-09', type: 'Van', capacity: '750 kg', odometer: '241,900', cost: '5,90,000', status: 'Retired' },
    ]);

    // 3. Create Drivers
    const drivers = await Driver.insertMany([
      { name: 'Alex', license: 'DL-88213', category: 'LMV', expiry: '12/2028', contact: '98765xxxx', compl: '96%', safety: 'Available', status: 'Available' },
      { name: 'John', license: 'DL-44120', category: 'HMV', expiry: '03/2025 EXPIRE', contact: '98220xxxx', compl: '81%', safety: 'Suspended', status: 'Suspended' },
      { name: 'Priya', license: 'DL-77031', category: 'LMV', expiry: '08/2021', contact: '99110xxxx', compl: '99%', safety: 'On Trip', status: 'On Trip' },
      { name: 'Suresh', license: 'DL-90045', category: 'HMV', expiry: '01/2027', contact: '97440xxxx', compl: '88%', safety: 'Available', status: 'Off Duty' },
    ]);

    // 4. Create Trips
    await Trip.insertMany([
      { tripId: 'TR001', source: 'Gandhinagar Depot', destination: 'Ahmedabad Hub', vehicle: vehicles[0]._id, driver: drivers[0]._id, weight: '700', distance: '38', status: 'Dispatched', timeInfo: '45 min' },
      { tripId: 'TR004', source: 'Vatva Industrial Area', destination: 'Sanand Warehouse', vehicle: vehicles[1]._id, driver: drivers[3]._id, weight: '5000', distance: '120', status: 'Draft', timeInfo: 'Awaiting driver' },
      { tripId: 'TR006', source: 'Mansa', destination: 'Kalol Depot', vehicle: vehicles[2]._id, driver: drivers[1]._id, weight: '1000', distance: '15', status: 'Cancelled', timeInfo: 'Vehicle went to shop' },
    ]);
    
    // 5. Create Maintenance
    await Maintenance.insertMany([
      { vehicle: vehicles[0]._id, service: 'Oil Change', cost: '2,500', date: '07/07/2026', status: 'In Shop' },
      { vehicle: vehicles[1]._id, service: 'Engine Repair', cost: '18,000', date: '06/07/2026', status: 'Completed' },
      { vehicle: vehicles[2]._id, service: 'Tyre Replace', cost: '6,200', date: '05/07/2026', status: 'In Shop' },
    ]);

    // 6. Create Expenses
    await Expense.insertMany([
      { type: 'Fuel', vehicle: vehicles[0]._id, date: '05 Jul 2026', liters: '42 L', fuelCost: '3,150' },
      { type: 'Fuel', vehicle: vehicles[1]._id, date: '06 Jul 2026', liters: '110 L', fuelCost: '8,400' },
      { type: 'Other', trip: null, toll: '120', other: '0', maintCost: '0', totalStatus: 'Available' },
    ]);

    console.log('Data Imported successfully! Use provided RBAC emails with password: password123');
  } catch (error) {
    console.error('Error importing data:', error);
  }
};

module.exports = runSeeder;
