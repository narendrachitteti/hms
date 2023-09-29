const mongoose = require('mongoose');

const reportDataSchema = new mongoose.Schema({
  RBC: String,
  Hb: String,
  Hct: String,
  MCV: String,
  MCH: String,
  MCHC: String,
  RDW: String,
  PLT: String,
  MPV: String,
  Neutrophil: String,
  Lymphocyte: String,
  Monocyte: String,
  Eosinophil: String,
  Basophil: String,
});

module.exports = mongoose.model('ReportData', reportDataSchema );
