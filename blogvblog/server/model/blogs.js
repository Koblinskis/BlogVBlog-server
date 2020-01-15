const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  score: {
    type: Number,
  },
  versus: {
    type: Array,
  }
})

blogSchema.statics.getBlogTitles = async function() {
  const blog = this
  const blogOne = await blog.aggregate([{
    $sample: { size: 1 }
  }, {
    $project: { category: 1, title: 1 }
  }])
  const blogTwo = await blog.aggregate([
  {
    $match:
    {
      category: blogOne[0].category,
      _id: { $ne: blogOne[0]._id }
    }
  }, {
    $sample: { size: 1}
  }, {
    $project: {
      category: 1,
      title: 1
    }
  }])

  const blogs = {
    category: blogOne[0].category,
    blogTitles: [{
      _id: blogOne[0]._id,
      title: blogOne[0].title
    }, {
      _id: blogTwo[0]._id,
      title: blogTwo[0].title
    }]
  }
  return blogs
}

const Blogs = mongoose.model('Blogs', blogSchema)

module.exports = Blogs