const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: String, required: true },
  odometer: { type: String, required: true },
  cost: { type: String, required: true },
  status: { type: String, required: true, enum: ['Available', 'On Trip', 'In Shop', 'Retired'], default: 'Available' },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
