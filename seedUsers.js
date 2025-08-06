const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // or bcryptjs if you used that
const User = require('./models/User'); // Adjust the path if needed

const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to DB
connectDB();

const seedUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10); // default password

    const users = [
      {
        username: 'admin',
        password: hashedPassword,
        email: 'admin@example.com',
        name: 'Super Admin',
        role: 'admin',
        status: 'active',
      },
      {
        username: 'john_doe',
        password: await bcrypt.hash('password123', 10),
        email: 'john@example.com',
        name: 'John Doe',
        role: 'user',
        status: 'active',
      }
    ];

    await User.deleteMany({});
    await User.insertMany(users);

    console.log('Users seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedUsers();
