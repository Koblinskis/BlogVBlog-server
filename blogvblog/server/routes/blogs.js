const express = require('express')
const router = new express.Router()
const blogs_controller = require('../controllers/blogController')

router.get("/versus", blogs_controller.blogs_versus_get)

router.post('/voted', blogs_controller.blogs_voted_post)

router.post('/vote', blogs_controller.blogs_vote_post)

module.exports = router