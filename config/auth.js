// middleware to checklogin
exports.checklogin = (req, res, next)=> {
    if(!req.session.user) return next(); // login page   
     // already a logged in user is there
     res.redirect('/user/profile') // if already user login  
 }
 
exports.permission = (req, res, next)=> {
     if(req.session.user) {
         return next()
     }
     res.redirect('/user/login');   
 }

exports.adminCheck = (req, res, next)=>{
    // get data from user/session/db
    const role = 'customer'
    if(role == 'admin') {
        return next()
    }
    res.send('<h1>You do not have admin Permission!</h1>')
}

exports.employeeCheck = (req, res, next)=>{
    // get data from user/session/db
    const role = 'employee'
    if(role == 'employee' ||  role == 'admin') {
        return next()
    }
    res.send('<h1>You do not have  Permission!</h1>')
}



 