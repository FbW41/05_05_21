const express = require('express');
const router = express.Router();
const User = require('../models/User')
const url = require('url')
const auth = require('../config/auth')

router.get('/profile', auth.permission, (req, res)=>{
    res.render('profile', {
        user: req.session.user
    })
})

router.get('/list', auth.permission, (req, res)=>{
    res.send('You have permission to see this page')
})


// logout
router.get('/logout', (req, res)=> {
    delete req.session.user;
    res.redirect('/user/login');
})

router.get('/login', auth.checklogin, (req, res)=>{
    let msg = ''
    if(req.query.msg) {
        msg = req.query.msg
    }
    res.render('login', {msg})
})

router.post('/login', (req, res)=>{
    //res.json(req.body) // test 1
    /**
     * Take the data from user{email, password}
     * find the user from database by findone(email)
     */
    User.findOne({email:req.body.email}, (err, data)=> { //null or user{}
        /**
         * If there is email then check the password
         */
        if(data==null) {
            res.render('login', {
                msg:'Email not found! Please try correct one or signup!'
            })
        }
        else {
           // check password
           if(data.password!==req.body.password) { //not equal value and type
                res.render('login', {
                    msg:'Password doesnot match! Please try again!'
                })
           }
           else {
               // Store data or user into session                
               req.session.user = data; 
               res.redirect('/user/profile')
           }
        }
        //res.json(data) // test 2
        //res.redirect('/user/login') no data can se sent when redirect
        // res.redirect(url.format({ // also send data
        //     pathname: '/user/login',
        //     query: {
        //         msg: 'Email or password is invalid! Please try with the correct Data'
        //     }
        // }))
    })
})

module.exports = router;