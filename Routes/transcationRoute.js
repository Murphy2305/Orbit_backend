const express = require('express');
const router = express.Router();
const {getTransactionsByUserId,getTransactionsWithUserDetails, makeTransaction} = require('../Controllers/transcationController');

router.route('/:userId').get( getTransactionsByUserId);
router.route('/').get( getTransactionsWithUserDetails);
router.route('/maketranscation').post(makeTransaction);

module.exports = router;