const mongoose = require('mongoose')

const timelineSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  timestamp: {
    type: Object,
  },
  currentScore: {
    type: Number,
  },
  change: {
    type: Number,
  },
  opponentTitle: {
    type: String,
  },
  opponentId: {
    type: String,
  },
  opponentCurrentScore: {
    type: Number,
  }
})

timelineSchema.statics.createTimeline = async function() {
  const timeline = new Timeline(req.body)

    timeline.timestamp = timestamp
    await timeline.save()

    res.send(timeline)
}

const Timeline = mongoose.model('Timeline', timelineSchema)

module.exports = Timeline