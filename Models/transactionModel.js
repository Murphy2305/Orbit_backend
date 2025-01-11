const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['success', 'pending', 'failed'],
    required: true
  },
  type: {
    type: String,
    enum: ['debit', 'credit'],
    required: true
  },
  transactionDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  }
}, {
  timestamps: true 
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
