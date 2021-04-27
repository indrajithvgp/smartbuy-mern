const express = require('express')
const router = express.Router()
const {getProductById, getProducts,createProduct, 
    createProductReview,getTopProducts,
    deleteProduct, updateProduct} = require('../controllers/productController')
const {protect, admin} = require('../middleware/authMiddleware.js')


router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router.route('/top').get(getTopProducts)

router.route('/:id')
    .get(getProductById) 
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)


router.route('/:id/reviews')
    .post(protect, createProductReview)

module.exports = router