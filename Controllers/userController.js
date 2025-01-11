const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');



const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

const addUser = asyncHandler(async (req, res) => {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
        return res.status(400).json({ error: 'Please Enter all the Fields' });
    }

    try {
        const userExists = await User.findOne({ phoneNumber });

        if (userExists) {
            return res.status(400).json({ error: 'Phone Number already Registered' });
        }

        const user = await User.create({ name, phoneNumber });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber,
            });
        } else {
            res.status(400).json({ error: 'User creation failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { addUser, getUser };
