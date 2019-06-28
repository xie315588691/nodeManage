const md5 = require('md5')
const db = require('../config')
exports.query = (req, res, next) => {


}
exports.new = async (req, res, next) => {
    try {
        const body = req.body
        const addsql = `INSERT INTO 
    users(username,password,email,gender,nickname,avatar) 
    VALUES('${body.email}','${md5(body.password)}','${body.email}',${body.gender},'${body.nickname}','${body.avatar}')`

        const result = await db.query(addsql)
        console.log(result);
    } catch (err) {
        next(err)
    }

}
exports.update = (req, res, next) => {

}
exports.delete = (req, res, next) => {

}