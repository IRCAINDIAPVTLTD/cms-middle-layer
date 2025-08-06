
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


const JWT_SECRET = process.env.JWT_SECRET || 'xyZa278A1#*@';

exports.generateToken = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required.' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'User account is not active.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '1h' }
    );

    res.json({
      success: true,
      token,
      expiresIn: process.env.JWT_EXPIRY || '1h',
    });
  } catch (err) {
    console.error('Token generation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
