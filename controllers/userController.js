const axios = require('axios')
// GET all users from api
exports.getUsers = (req, res)=> {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(result=> {
        res.render('userList', {
            users: result.data
        })
    })
}

// GET 1 User from api
exports.getOneUser=(req, res)=>{
    axios.get('https://jsonplaceholder.typicode.com/users/9')
    .then((result)=>{
        //console.log(result.data)
        res.render('profile', {user: result.data}); 
    })
}

// Delete user
exports.deleteUser = (req, res)=> {
    res.send('User removed...')
}

// add a picture to user
exports.addPicture = (req, res)=> {
    res.send('User add a new picture...')
}

// test route
exports.testRoute = (req, res)=> {
    res.send('Test /user/data/anyid/test')
}

// Get User Details by Id
exports.getUserById = (req, res)=> {
    res.send('User Detail')
}
