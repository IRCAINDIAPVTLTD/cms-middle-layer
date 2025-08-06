const express = require('express');
const router = express.Router();
const { 
    getMemberProfile, 
    getMemberAuth,
    getMemberDependant, 
    getMemberOtp, 
    getMemberOtpVerify,
    getMemberChangePassword,
    getMemberOB,
    getMemberSportsOB,
    getMemberCreditLimit,
} = require('../../controllers/api/memberController');

const {
    getMemberReceipt,
    getMemberBill,
} = require('../../controllers/api/billingController');

const verifyToken = require('../../middleware/auth');
const rateLimiter = require('../../middleware/rateLimiter');

// Protected route
router.post('/member/profile', rateLimiter, verifyToken, getMemberProfile);
router.post('/member/auth', rateLimiter, verifyToken, getMemberAuth);
router.post('/member/dependant', rateLimiter, verifyToken, getMemberDependant);
router.post('/send-otp',rateLimiter, verifyToken, getMemberOtp);
router.post('/verify-otp',rateLimiter, verifyToken, getMemberOtpVerify);
router.post('/member/change-password', rateLimiter, verifyToken, getMemberChangePassword);
router.post('/member/receipt', rateLimiter, verifyToken, getMemberReceipt);
router.post('/member/bill',rateLimiter, verifyToken, getMemberBill);
router.post('/member/ob',rateLimiter, verifyToken, getMemberOB);
router.post('/member/sportsob',rateLimiter, verifyToken, getMemberSportsOB);
router.post('/member/credit-limit',rateLimiter, verifyToken, getMemberCreditLimit);

module.exports = router;
