const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const {makeExecutableSchema} = require('graphql-tools')
import resolvers from './resolvers'
import typeDefs from'./schema'
import models from './db/models'
import { userMiddleware } from './services/user'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const app = express()

app.use(userMiddleware)

app.use('/api',
    graphqlHTTP( req => ({
        schema: schema,
        context: { models,
            userId: req.userId
        },
        graphiql: true
    })
))

app.listen(3005)