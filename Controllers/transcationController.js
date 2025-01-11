const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Transaction = require('../Models/transactionModel');
const User = require('../Models/userModel')

const getTransactionsByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { status, type, fromDate, toDate, page = 1, limit = 10 } = req.body;

    try {
        const user = await User.exists({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const matchConditions = { userId };

        if (status) {
            matchConditions.status = status;
        }

        if (type) {
            matchConditions.type = type;
        }

        if (fromDate || toDate) {
            matchConditions.transactionDate = {};
            if (fromDate) {
                matchConditions.transactionDate.$gte = new Date(fromDate);
            }
            if (toDate) {
                matchConditions.transactionDate.$lte = new Date(toDate);
            }
        }

        const skip = (page - 1) * limit;

        const transactions = await Transaction.find(matchConditions)
            .sort({ transactionDate: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Transaction.countDocuments(matchConditions);

        res.status(200).json({
            transactions,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



const getTransactionsWithUserDetails = asyncHandler(async (req, res) => {

    const { status, type, fromDate, toDate, page = 1, limit = 10 } = req.body;

    try {

        const matchConditions = {};
        if (status) matchConditions.status = status;
        if (type) matchConditions.type = type;
        if (fromDate || toDate) {
            matchConditions.transactionDate = {};
            if (fromDate) matchConditions.transactionDate.$gte = new Date(fromDate);
            if (toDate) matchConditions.transactionDate.$lte = new Date(toDate);
        }

        const skip = (page - 1) * limit;

        const transactions = await Transaction.aggregate([
            { $match: matchConditions },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            { $unwind: '$userDetails' },
            { $sort: { transactionDate: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) },
        ]);

        const total = await Transaction.countDocuments(matchConditions);

        res.status(200).json({
            transactions,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


const makeTransaction = asyncHandler(async (req, res) => {
    const { status, type, transactionDate, amount, userId } = req.body;

    if (!status || !type || !amount || !userId) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    if (amount <= 0) {
        res.status(400);
        throw new Error('Amount must be greater than 0');
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
        res.status(404);
        throw new Error('User not found');
    }

    const transaction = await Transaction.create({
        status,
        type,
        transactionDate: transactionDate || Date.now(),
        amount,
        userId
    });

    if (transaction) {
        res.status(201).json({
            
                _id: transaction._id,
                status: transaction.status,
                type: transaction.type,
                transactionDate: transaction.transactionDate,
                amount: transaction.amount,
                userId: transaction.userId,
                createdAt: transaction.createdAt
            
        });
    } else {
        res.status(400);
        throw new Error('Invalid transaction data');
    }
});

module.exports ={ getTransactionsByUserId, getTransactionsWithUserDetails ,makeTransaction};






