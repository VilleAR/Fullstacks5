const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  console.log('login request')
  console.log(request.body)
  const body = request.body
  console.log('username', body.username)

  const user = await User.findOne({ username: body.username })
  console.log('user:',user)
  // const passwordCorrect = user === null ?
  //   false :
  //   await bcrypt.compare(body.password, user.password)
  if (body.password === user.password) {
    passwordCorrect = true;
  } else {
    passwordCorrect = false;
  }
  console.log(passwordCorrect)
  
  console.log(body.password)
  console.log(user.password)
  
  if (!(user && passwordCorrect)) {
    return response.status(401).send({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter