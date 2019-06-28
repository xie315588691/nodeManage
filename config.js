const mysql = require('mysql')

var pool  = mysql.createPool({
    connectionLimit : 10,
    host: '182.61.49.187',
    user: 'root',
    password: 'xie321321',
    database: 'vuedemo',
    multipleStatements: true//配置多条sql查询
})

exports.query=function(sqlStr){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                return reject(err)
            }
            connection.query(sqlStr,(err,...args)=>{
                //释放连接
                connection.release();
                if(err){
                    return reject(err)
                }
                resolve(...args)
            })
        })
    })
}
