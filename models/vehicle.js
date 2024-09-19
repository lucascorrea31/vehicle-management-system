const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  color: { type: String, required: true },
  brand: { type: String, required: true },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
