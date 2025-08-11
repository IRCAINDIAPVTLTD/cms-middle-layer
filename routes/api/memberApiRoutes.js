import express from 'express';
const router = express.Router();

import {
    getMemberProfile, 
    getMemberAuth,
    getMemberDependant, 
    getMemberOtp, 
    getMemberOtpVerify,
    getMemberChangePassword,
    getMemberOB,
    getMemberSportsOB,
    getMemberCreditLimit,
    getMemberAuthV2,
} from '../../controllers/api/memberController.js';

import {
    getMemberReceipt,
    getMemberBill,
} from '../../controllers/api/billingController.js';

import verifyToken from '../../middleware/auth.js';
import rateLimiter from '../../middleware/rateLimiter.js';

// Protected routes
router.post('/member/profile', rateLimiter, verifyToken, getMemberProfile);
router.post('/member/auth', rateLimiter, verifyToken, getMemberAuth);
router.post('/member/auth-v2', rateLimiter, verifyToken, getMemberAuthV2);
router.post('/member/dependant', rateLimiter, verifyToken, getMemberDependant);
router.post('/send-otp', rateLimiter, verifyToken, getMemberOtp);
router.post('/verify-otp', rateLimiter, verifyToken, getMemberOtpVerify);
router.post('/member/change-password', rateLimiter, verifyToken, getMemberChangePassword);
router.post('/member/receipt', rateLimiter, verifyToken, getMemberReceipt);
router.post('/member/bill', rateLimiter, verifyToken, getMemberBill);
router.post('/member/ob', rateLimiter, verifyToken, getMemberOB);
router.post('/member/sportsob', rateLimiter, verifyToken, getMemberSportsOB);
router.post('/member/credit-limit', rateLimiter, verifyToken, getMemberCreditLimit);

export default router;
