const express = require('express');
const router = express.Router();
const User = require('../models/User')
const auth = require('../config/auth')
const bcrypt = require('bcrypt');

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
           // compare hash password with user password
           bcrypt.compare(req.body.password, data.password, (err, result)=>{
              if(result){
               // Store data or user into session                
               req.session.user = data; 
               res.redirect('/user/profile')
              }
              else {
                res.render('login', {
                    msg:'Password doesnot match! Please try again!'
                })
              }
           })
        }
    })
})

// signup form
router.get('/signup', (req, res)=>{
    res.render('signup')
})

// create a account
router.post('/signup', (req, res)=> {
    // hash a password using bcrypt
    // salt is the number of level that hash will create using a loop
    const userPassword = req.body.password; // 1234
    const saltRound = 10; // hg2182712871289
    // encrypting the password: Async way
    bcrypt.hash(userPassword, saltRound, (err, hashPassword)=>{
        req.body.password = hashPassword;
        const newUser = new User(req.body);
        newUser.save((err, doc)=>{
            if(err) throw err;
            res.json(doc)
        }) 
    })

    // Sync way: Blocking way
    // const hashPassword = bcrypt.hashSync(userPassword, saltRound); // wait
    // req.body.password = hashPassword;
    // const newUser = new User(req.body);
    // newUser.save((err, doc)=>{
    //     if(err) throw err;
    //     res.json(doc)
    // }) 
})

module.exports = router;