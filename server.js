
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import http from 'http';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import tokenRoutes from './routes/api/tokenRoutes.js';
import memberApiRoutes from './routes/api/memberApiRoutes.js';
import eventApiRoutes from './routes/api/eventApiRoutes.js';
import sportsApiRoutes from './routes/api/sportsApiRoutes.js';
import paymentApiRoutes from './routes/api/paymentApiRoutes.js'; // Import the new payment API routes
// include and initialize the rollbar library with your access token
import Rollbar from 'rollbar';
import logRequestResponse  from './helpers/logRequestResponse.js';

import setupSwagger from './swagger.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json());

app.use(logRequestResponse);

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_super_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
    // sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
}));


var rollbar = new Rollbar({
  accessToken: '3c05a283b1fb4e7191ebdc3e61b3a0bd',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
app.use(rollbar.errorHandler());

// --- API Routes ---
app.get('/', (req, res) => res.send('API is running...'));

app.use('/external-api', tokenRoutes);
app.use('/external-api', memberApiRoutes);
app.use('/external-api', eventApiRoutes);
app.use('/external-api', sportsApiRoutes);
app.use('/external-api', paymentApiRoutes);

setupSwagger(app); // Add Swagger middleware

// --- Start Server ---
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
