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
        var selectUserpass = `select * from user where password = '${req.body.passWord}'`;
        connection.query(selectUserpass,function(error,results){
            if(!handleError('查询',error)) return;
            if(results.length == 0){
                res.send('密码输入错误');
            }else{
                if(req.body.newPassword === req.body.againPassword){
                    var updateSQL = `UPDATE user SET password = '${req.body.newPassword}'`;
                    connection.query(updateSQL,function(error){
                        if(!handleError('修改',error)) return;
                        res.send('修改成功');
                    });
                }else{
                    res.send('两次输入密码不一致');
                }
            }
        });

    });

});

module.exports = router;