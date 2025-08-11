import mongoose from 'mongoose';

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
    default: null
  },
  club_sms_template: {
    type: String,
    default: null
  },
  club_payment_gateway: {
    type: String,
    default: null
  },
  club_payment_key_id: {
    type: String,
    default: null
  },
  club_payment_key_secret: {
    type: String,
    default: null
  },
  club_status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  collection: 'club_master',
  timestamps: true
});

const Club = mongoose.model('Club', clubSchema);
export default Club;
