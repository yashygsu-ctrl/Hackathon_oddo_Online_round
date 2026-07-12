const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  type: { type: String, required: true, enum: ['Fuel', 'Other'] },
  
  // Fuel fields
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  date: { type: String },
  liters: { type: String },
  fuelCost: { type: String },
  
  // Other fields
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  toll: { type: String },
  other: { type: String },
  maintCost: { type: String },
  totalStatus: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
