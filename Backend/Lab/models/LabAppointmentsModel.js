const mongoose = require('mongoose');

const labappointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  status: String,
  doctor: String,
  consultation: String,
  appointment: String,
});

module.exports = mongoose.model('LabAppointment', labappointmentSchema);
