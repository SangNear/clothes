const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken')
const registerUser = async (req, res) => {
    const { userName, password, role, email } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            password: hashedPassword,
            role,
            email
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                _id: newUser._id,
                userName: newUser.userName,
                role: newUser.role,
                email: newUser.email,
            },

        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = await generateToken(user)

        res.cookie('token', token, {
            // httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 ngày
        })

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: {
                _id: user._id,
                userName: user.userName,
                role: user.role,
                email: user.email,
            },
            token
        });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const logout = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Loged out successfully"
    })
}

const authMiddleWare = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.json({
        success: false,
        message: "Unauthorized"
    })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}
module.exports = {
    registerUser, loginUser, logout, authMiddleWare
}