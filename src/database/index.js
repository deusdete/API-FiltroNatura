const mongoose = require("mongoose");
require('dotenv').config()

const url = `mongodb+srv://${process.env.USERNAME_DATABASE}:${process.env.PASS_DATABASE}@cluster0.49ma5.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB conectado")
})
.catch(err => console.log(err))

module.exports = mongoose;