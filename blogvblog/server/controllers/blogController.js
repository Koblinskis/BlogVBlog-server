const Blogs = require('../model/blogs')

exports.blogs_versus_get = async function(req, res) {
  try {
    const blogs = await Blogs.getBlogTitles()
    res.send(blogs)

  } catch (e) {
    res.status(500).send()
  }
}

exports.blogs_vote_post = async function(req, res) {
  try{
    const blogs = await Blogs.getBlogTitles()
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

exports.blogs_winner_post = async function(req, res) {
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
    res.send([winnerResults, loserResults])
  
  } catch (e) {
    res.status(500).send(e)
  }
}