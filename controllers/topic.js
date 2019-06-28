const db = require('../config')
exports.query = async (req, res, next) => {
    let {_page, _limit} = req.query
    _page = _page > 0 ? _page : 1;
    _limit = _limit < 0 && _limit > 20 ? 20 : _limit;

    const start = (_page - 1) * _limit
    const sqlStr = `SELECT * FROM articles LIMIT ${start},${_limit}`
    const result = await db.query(sqlStr)
    res.status(200).json(result)

}
exports.new = async (req, res, next) => {
    try {
        const {user} = req.session
        const body = req.body
        const sqlStr = `INSERT INTO 
        articles(title,content,user_id) 
        VALUES('${body.title}','${body.content}','${user.id}')`
        const result = await db.query(sqlStr)
        res.status(201).json(result)
    } catch (e) {
        next(e)
    }

}
exports.update = async (req, res, next) => {
    try {
        const {id} = req.params
        const body = req.body
        const sqlStr = `UPDATE articles SET title='${body.title}' ,content='${body.content}' where id=${id}`;
        const result = await db.query(sqlStr)
        res.status(200).json(result)
    } catch (e) {
        next(e)
    }

}
exports.delete = async (req, res, next) => {
    try {
        const {id} = req.params
        const sqlStr = `DELETE FROM articles WHERE id=${id}`;
        const result = await db.query(sqlStr)
        res.status(200).json(result)
    } catch (e) {
        next(e)
    }

}