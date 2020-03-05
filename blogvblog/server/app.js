const express = require('express')
require('./database/mongodb')
const cors = require('cors')
const blogRouter = require('./routes/blogs')
const timelineRouter = require('./routes/timeline')
const port = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(blogRouter)
app.use(timelineRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})