var express = require('express');
var handleError = require('./handleError');
var mysql = require('mysql');
var router = express.Router();


var options = {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '123456',
    //代表连接的时候使用的数据库
    database : 'NewB'
};
//连接池
var pool = mysql.createPool(options);
pool.getConnection(function(error,connection){

    router.post('/',function(req,res){
        //es6下的模板字符串
        var selectUsername = `select * from user where username = '${req.body.userName}'`;
        connection.query(selectUsername,function(error,results){
            if(!handleError('查询',error)) return;
            if(results.length == 0){
                res.send('用户不存在');
            }else{
                var user = results[0];
                if(user['password'] === req.body.passWord){
                    res.send('登录成功');
                }else{
                    res.send('密码错误');
                }
            }
        });

    });

});




module.exports = router;