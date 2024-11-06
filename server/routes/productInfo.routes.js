
const express = require('express');
const { getAllProducts, createNewProduct, deleteProduct, UpdatingProduct, deleteAllProduct } = require('../controllers/productInfo.controllers');
const router = express.Router();

router.get('/getAll',getAllProducts)
router.post('/create',createNewProduct)
router.put('/update/:id',UpdatingProduct)
router.delete('/delete/:id',deleteProduct)
router.delete('/deleteAll',deleteAllProduct)

module.exports = router;
