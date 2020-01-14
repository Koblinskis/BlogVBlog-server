const express = require('express')
require('./database/mongodb')

const port = 3001
const app = express()

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})