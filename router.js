const express = require('express')
const router = express.Router()
const db = require('./config')
const userController = require('./controllers/users.js')
const topicController = require('./controllers/topic.js')
const commentController = require('./controllers/comments.js')

const sessionController = require('./controllers/session.js')

function checkLogin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({
            err: '请登录'
        })
    }
    next()
}

async function checkUser(req, res, next) {
    try {
        const {id} = req.params
        const [topic] = await db.query(`select * from articles WHERE id=${id}`)
        if (!topic) {
            return res.status(404).json({
                err: '该信息已经不存在了！'
            })
        }
        if (topic.user_id != req.session.user.id) {
            return res.status(401).json({
                err: 'sorry 你没有操作权限!'
            })
        }
        next()
    } catch (e) {
        next(e)
    }


}

/*
* 用户
* */
router
    .get('/users', userController.query)
    .post('/users', userController.new)
    .patch('/users/:id', userController.update)
    .delete('/users', userController.delete)


/*
* 话题
* */
router
    .get('/comments', commentController.query)
    .post('/comments', checkLogin, commentController.new)
    .patch('/tcomments/:id', checkLogin, commentController.update)
    .delete('/comments/:id', checkLogin, commentController.delete)


/*
* 评论
* */
router
    .get('/topics', topicController.query)
    .post('/topics', checkLogin, topicController.new)
    .patch('/topics/:id', checkLogin, checkUser, topicController.update)
    .delete('/topics/:id', checkLogin, checkUser, topicController.delete)
/**
 * 会话
 * */

router
    .get('/session', sessionController.query)
    .post('/session', sessionController.new)
    .delete('/session', checkLogin, sessionController.delete)

module.exports = router