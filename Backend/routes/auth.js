const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authenticateToken = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/login', (req, res) => AuthController.login(req, res));

router.get('/profile', authenticateToken, (req, res) => AuthController.getProfile(req, res));

router.get('/admin/dashboard', authenticateToken, authorize('Admin'), (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamat datang di Dashboard Admin',
        data: {
            user: req.user
        }
    });
});

module.exports = router;