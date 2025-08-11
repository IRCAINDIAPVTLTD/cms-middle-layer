// models/RequestInfo.js

const mongoose = require('mongoose');

const RequestInfoSchema = new mongoose.Schema({
  body: {
    type: mongoose.Schema.Types.Mixed, // can store any JSON object
    required: true,
  },
  headers: {
    type: mongoose.Schema.Types.Mixed, // any headers object
    required: true,
  },
  query: {
    type: mongoose.Schema.Types.Mixed, // query params object
    required: true,
  },
  ip_address: {
    type: String,
    required: true,
  },
  device_info: {
    type: String,
    required: false,
  },
  method: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  response_status: Number,
  response_body: mongoose.Schema.Types.Mixed,
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = mongoose.model('RequestInfo', RequestInfoSchema);
