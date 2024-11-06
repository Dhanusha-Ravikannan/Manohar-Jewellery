
const express = require('express');
const { getAllBills, createBills, deleteBills } = require('../controllers/bills.controllers');
const router = express.Router();

router.get('/getAll',getAllBills);
router.post('/create',createBills);
router.delete('/delete/:id',deleteBills);

module.exports = router;
