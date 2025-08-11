const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Club = require('./models/Club');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to DB
connectDB();

const seedClubs = async () => {
  try {
    await Club.deleteMany(); // Optional: clear existing data

    const testClubs = [
      {
        club_code: 'BAY',
        club_name: 'Bay Club',
        club_ip_address: 'https://uatbilling.bayclub.in/CMSWEBAPIUAT',
        club_status: 'active',
        club_sms_gateway:'https://apibulksms.way2mint.com/pushsms?username=bayclub&password=kuGD-18-&from=BAYCLB&to=91{mobile}&text={msg}&tmplId=1207165286434061651&data4=1201165243763115220,1702173216915572636',
        club_sms_template: 'Dear Member, Your OTP for login to The Bay Club App is {{otp_code}} Please do not share this OTP. Regards, The Bay Club',
        club_payment_gateway: 'razorpay',
        club_payment_key_id: 'rzp_test_3iwS4ePVvPxaX4',
        club_payment_key_secret: 'UiRKy0RLMRXZjogYUcgN2DX0'
      }
    ];

    await Club.insertMany(testClubs);
    console.log('Club data seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedClubs();
