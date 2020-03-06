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
    type: Object,
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

blogSchema.statics.getWinners = async function() {
  const blog = this
  const winnerBlogs = await blog.aggregate([
    {
      '$sort': {
        'score': -1
      }
    }, {
      '$group': {
        '_id': '$category', 
        'title': {
          '$first': '$title'
        }, 
        'score': {
          '$first': '$score'
        }, 
        'id': {
          '$first': '$_id'
        }, 
        'versus': {
          '$first': '$versus'
        }
      }
    }
  ])
  return winnerBlogs
}

const Blogs = mongoose.model('Blogs', blogSchema)

module.exports = Blogs