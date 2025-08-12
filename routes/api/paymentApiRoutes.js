import express from 'express';
import { setPaymentTransaction, confirmPayment } from '../../controllers/api/paymentController.js';
import verifyToken from '../../middleware/auth.js';
import rateLimiter from '../../middleware/rateLimiter.js';

const router = express.Router();

router.post('/payment/initiate', rateLimiter, verifyToken, setPaymentTransaction);
router.post('/payment/save', rateLimiter, verifyToken, confirmPayment);

export default router;
