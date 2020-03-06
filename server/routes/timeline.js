const express = require('express')
const router = new express.Router()
const timeline_controller = require('../controllers/timelineController')

router.post('/timeline', timeline_controller.timeline_create_post)

module.exports = router