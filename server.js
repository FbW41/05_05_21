// Declaration
const express = require('express');
const app = express();
// import dotenv configuaration
require('dotenv').config()
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const session = require('express-session');
/**
 * process.env means in the machine processes has an environment
 * process.env.PORT means this process environment has a variable called PORT
 */
const PORT = process.env.PORT;

// Mongodb connection using mongoose module
const mongoose = require('mongoose');
const DB_NAME = process.env.DB_NAME;
const DB_LINK = process.env.MONGO_LINK+DB_NAME
mongoose.connect(DB_LINK, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=> console.log('MongoDB database is Successfully connected'))
.catch(()=> console.log('Database connection failed!'))

// Settings
// express session setting
app.use(session({
    secret: process.env.MY_SECRET, // signature 
    cookie: { // set the time for session data
        maxAge: 1000*60*60, // 1h
    }
}));

app.use(express.static(__dirname+'/public'))
app.set('view engine', 'hbs');

app.use(express.urlencoded({
    extended: false
}))

// Routing

const User = require('./models/User')
// test mongoose query methods
app.get('/searchByName', (req, res)=> {
    //res.json('test ok') // check route test ok
    // req.body.name
    User.findOne({name:"Jose"}, (err, data)=>{
        if(err) throw err;
        res.json(data)
    })
})

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)

// listen app with port
app.listen(PORT, ()=>{
    console.log('Server is running...')
})





