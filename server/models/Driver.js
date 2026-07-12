const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
  name: { type: String, required: true },
  license: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  expiry: { type: String, required: true },
  contact: { type: String, required: true },
  compl: { type: String, required: true },
  safety: { type: String, required: true, enum: ['Available', 'Suspended', 'On Trip'], default: 'Available' },
  status: { type: String, required: true, enum: ['Available', 'Suspended', 'On Trip', 'Off Duty'], default: 'Available' },
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
