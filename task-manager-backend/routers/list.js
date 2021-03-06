const Router = require('express')
const passport = require('passport')
const { addList, deleteList, getLists, editList } = require('../controller/list')
const router = new Router()

router.post('/add', passport.authenticate('jwt', {session: false}), addList)
router.post('/delete', passport.authenticate('jwt', {session: false}), deleteList)
router.post('/get', passport.authenticate('jwt', {session: false}), getLists)
router.post('/edit', passport.authenticate('jwt', {session: false}), editList)

module.exports = router