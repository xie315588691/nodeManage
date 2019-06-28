const md5 = require('md5')
const session = require('express-session')
const db = require('../config')
exports.query = (req, res, next) => {
    const {user} = req.session
    if (!user) {
        return res.status(401).json({
            error: "用户没有授权"
        })
    }
    res.status(200).json(user)
}

exports.new = async (req, res, next) => {
    try {
        const body = req.body
        const sqlStr = `SELECT * FROM users WHERE email='${body.email}' AND password='${md5(body.password)}'`
        const [result] = await db.query(sqlStr)
        if (!result) {
            return res.status(404).json({
                err: '账号或者密码输入有误!'
            })
        }
        req.session.user = result
        res.status(201).json(result)
    } catch (e) {
        next(e)
    }
}

exports.update = (req, res, next) => {

}
exports.delete = async (req, res, next) => {
    req.session.destroy(function (err,data) {
        if(err){
            return res.status(404).json({
                err:"销毁失败"
            })
        }
        res.status(201).json({
            result: data
        })
    });

}