var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('forgetPass',{title:'修改密码'});
});

module.exports = router;