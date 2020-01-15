const Blogs = require('../model/blogs')

exports.blogs_versus_get = async function(req, res) {
  try {
    const blogs = await Blogs.getBlogTitles()
    console.log(blogs)
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
    const winnerBlog = await Blogs.findById(winnerId)
    const loserBlog = await Blogs.findById(loserId)
    const idObj = { id: loserId, count: 1}
    const versusArr = winnerBlog.versus.concat(idObj)
    const update = { $inc: { score: 1 }, versus: versusArr }
    
    const newBlog = await Blogs.findByIdAndUpdate(winnerId, update, { new: true })
    if(!newBlog) {
      return res.status(404).send('No Blog Exists')
    }
    res.send([newBlog, winnerBlog, loserBlog])
  
  } catch (e) {
    res.status(500).send(e)
  }
}

//5e1a1b3a35791dd5ad712187
//5e1a1b3a35791dd5ad7121e4
