const express = require('express');
const router = express.Router();
const auth = require('../config/auth')
// everyone
router.get('/productList', (req, res)=>{
    res.send('Here Customers can see all products')
})
// only admin
router.get('/productControl',auth.adminCheck,(req, res)=>{
    res.send('Admin Can control the product list like add, delete, update, modify')
})
// employee/admin but not by customer
router.get('/productAdd', auth.employeeCheck,(req, res)=>{
    res.send('Employee or Sales man can add product')
})

module.exports = router;