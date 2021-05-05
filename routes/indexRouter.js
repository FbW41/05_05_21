const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    if(req.session.refresh){
        req.session.refresh++;
        //req.session.refresh = req.session.refresh +1
        res.send('<h1>The website is refresh for:' + req.session.refresh + ' times</h1>')
    }
    else {
        req.session.refresh = 1
        res.send('<h1>The website is refresh for:' + req.session.refresh + ' times</h1>')
    }
})

module.exports = router;