const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  }
})

const Blogs = mongoose.model('Blogs', blogSchema)

module.exports = Blogs