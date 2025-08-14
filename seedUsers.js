import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; // or bcryptjs if you used that
import User from './models/User.js'; // Adjust the path if needed

import connectDB from './config/db.js';

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
        username: 'apibay',
        password: await bcrypt.hash('bAy@49IN3w', 10),
        email: 'ram@kelsa.io',
        name: 'Admin',
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
