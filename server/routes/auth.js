const express = require('express');
const { registerUser, loginUser, logout, authMiddleWare } = require('../controllers/auth');
const router = express.Router();


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/check-auth', authMiddleWare, (req, res) => {
    const user = req.user
    res.status(200).json({
        success: true,
        message: "Authenticated",
        user
    })

})
module.exports = router;