const Timeline = require('../model/timeline')

exports.timeline_create_post = async function(req, res) {
  const timestamp = new Date()
  try {
    const timeline = new Timeline(req.body)

    timeline.timestamp = timestamp
    await timeline.save()

    res.send(timeline)

  } catch(e) {
    res.status(500).send()
  }
}