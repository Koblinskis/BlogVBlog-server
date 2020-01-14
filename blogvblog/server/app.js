const express = require('express')
require('./database/mongodb')
const blogRouter = require('./routes/blogs')

const port = 3001
const app = express()

app.use(express.json())
app.use(blogRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})