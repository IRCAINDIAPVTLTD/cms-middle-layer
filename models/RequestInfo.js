import mongoose from 'mongoose';

const RequestInfoSchema = new mongoose.Schema({
  body: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  headers: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  query: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  ip_address: {
    type: String,
    required: true,
  },
  device_info: {
    type: String,
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
  timestamps: true,
});

const RequestInfo = mongoose.model('RequestInfo', RequestInfoSchema);

export default RequestInfo;
