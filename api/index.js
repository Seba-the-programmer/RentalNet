const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const {makeExecutableSchema} = require('graphql-tools')
import resolvers from './resolvers'
import typeDefs from'./schema'
import models from './db/models'
import { userMiddleware } from './services/user'
import * as auth from './services/authorization'
import jwt from 'jsonwebtoken'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const app = express()

app.use(userMiddleware)

app.get('/confirmation/:token', async (req, res) => {
  const token = req.params.token
  try {
    if(token) {
      const { name } = await jwt.verify(token, auth.SECRET)
      await models.users.update({ isConfirmed: 1 }, { where: { username: name } })
    }
  } catch (e) {
    console.log(e)
  }

  return res.redirect('http://localhost:3005/login');
})

app.use('/api',
    graphqlHTTP( req => ({
        schema: schema,
        context: { models,
            userId: req.userId
        },
        graphiql: true
    })
))
app.get('/login', (req, res) => {
  res.send('Congratulations!')
})

app.listen(3005)