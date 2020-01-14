const express = require('express')
const router = new express.Router()
const Blogs = require('../model/blogs')

router.get("/versus", async (req, res) => {
  try {
    const blogOne = await Blogs.aggregate([{
      $sample: { size: 1 }
    }, {
      $project: { category: 1, title: 1 }
    }])
    const blogTwo = await Blogs.aggregate([
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
    console.log(blogTwo)
    console.log(blogOne)

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
    console.log(blogs)

    res.send(blogs)

  } catch (e) {
    res.status(500).send()
  }
})

router.post('/winners', async (req, res) => {
  try{
    const blogs = req.body.blogTitles
    if (blogs[0].winner) {
      res.send({
        winner: blogs[0]._id,
        loser: blogs[1]._id
      })
    } else if (blogs[1].winner) {
      res.send({
        winner: blogs[1]._id,
        loser: blogs[0]._id
      })
    } else {
      throw new Error()
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router