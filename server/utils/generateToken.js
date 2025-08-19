const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object containing _id and role.
 * @returns {Promise<string>} The signed JWT token.
 */
const generateToken = async (user) => {
    const payload = {
        id: user._id,
        role: user.role,
        userName: user.userName
    };
    const signAsync = promisify(jwt.sign);
    try {
        const token = await signAsync(payload, process.env.JWT_SECRET, { expiresIn: '40h' });
        return token;
    } catch (err) {
        throw err;
    }
};

module.exports = generateToken;