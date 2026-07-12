const mongoose = require('mongoose');

const maintenanceSchema = mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  service: { type: String, required: true },
  cost: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true, enum: ['Active', 'In Shop', 'Completed'], default: 'In Shop' },
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);
