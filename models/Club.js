const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  club_code: {
    type: String,
    required: true,
    unique: true
  },
  club_name: {
    type: String,
    required: true
  },
  club_ip_address: {
    type: String,
    required: true
  },
  club_sms_gateway: {
    type: String,
    required: false,
    default: null
  },
  club_sms_template: {
    type: String,
    required: false,
    default: null
  },
  club_payment_gateway: {
    type: String,
    required: false,
    default: null
  },
  club_payment_key_id: {
    type: String,
    required: false,
    default: null
  },
  club_payment_key_secret: {
    type: String,
    required: false,
    default: null
  },
  club_status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  collection: 'club_master',
  timestamps: true // <-- This adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Club', clubSchema);
