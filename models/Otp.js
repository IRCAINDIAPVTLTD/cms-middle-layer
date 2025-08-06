const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  membership_no: { type: String, required: true },
  mobile_number: { type: String, required: true },
  club_code: { type: String, required: true },
  otp: { type: String, required: true },
  isExpired: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Otp", otpSchema);
