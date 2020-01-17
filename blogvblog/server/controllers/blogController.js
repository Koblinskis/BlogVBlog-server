const Blogs = require('../model/blogs')
const Timeline = require('../model/timeline')

exports.blogs_versus_get = async function(req, res) {
  try {
    const blogs = await Blogs.getBlogTitles()
    res.send(blogs)

  } catch (e) {
    res.status(500).send()
  }
}

exports.blogs_voted_post = async function(req, res) {
  try{
    const winnerBlog = req.body.blogTitles
    const winnerObjOne = {
      winner: winnerBlog[0]._id,
      loser: winnerBlog[1]._id,
    }
    const winnerObjTwo = {
      winner: winnerBlog[1]._id,
      loser: winnerBlog[0]._id,
    }
    if (winnerBlog[0].winner) 
    {
      res.send([ winnerObjOne, blogs ])
    } 
    else if (winnerBlog[1].winner) 
    {
      res.send([ winnerObjTwo, blogs ])
    } else {
      throw new Error()
    }
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.blogs_vote_post = async function(req, res) {
  try{
    const winnerId = req.body.winner
    const loserId = req.body.loser

    const updateWinner = { $inc: { score: 1, 
      [`versus.${loserId}`]: 1
    } }
    const updateLoser = { $inc: { score: -1, 
      [`versus.${winnerId}`]: -1
    } }
    
    const winnerResults = await Blogs.findByIdAndUpdate(winnerId, updateWinner, { new: true, upsert: true })
    const loserResults = await Blogs.findByIdAndUpdate(loserId, updateLoser, { new: true, upsert: true })
    
    if(!winnerResults || !loserResults) {
      return res.status(404).send('No Blog Exists')
    }
    const timestamp = new Date()

    const winnerTimeObj = {
      blogId: winnerResults._id,
      category: winnerResults.category,
      title: winnerResults.title,
      timestamp,
      currentScore: winnerResults.score,
      change: 1,
      opponentTitle: loserResults.title,
      opponentId: loserResults._id,
      opponentCurrentScore: loserResults.score
    }

    const loserTimeObj = {
      blogId: loserResults._id,
      category: loserResults.category,
      title: loserResults.title,
      timestamp,
      currentScore: loserResults.score,
      change: -1,
      opponentTitle: winnerResults.title,
      opponentId: winnerResults._id,
      opponentCurrentScore: winnerResults.score
    }
    
    const winnerTimeline = new Timeline(winnerTimeObj)
    const loserTimeline = new Timeline(loserTimeObj)
    await winnerTimeline.save()
    await loserTimeline.save()
    const newBlogs = await Blogs.getBlogTitles()

    res.send([winnerTimeline, loserTimeline, newBlogs])
  
  } catch (e) {
    res.status(500).send(e)
  }
}