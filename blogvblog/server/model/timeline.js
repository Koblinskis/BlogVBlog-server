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
    type: Number,
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

const Timeline = mongoose.model('Timeline', timelineSchema)

module.exports = Timeline