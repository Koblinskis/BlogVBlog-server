const mongoose = require('mongoose')

mongoose.connect(process.env.REACT_APP_MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})