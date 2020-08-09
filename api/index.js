const express = require('express')
//const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const {makeExecutableSchema} = require('graphql-tools')
import resolvers from './resolvers'
import typeDefs from'./schema'
import models from './db/models'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const app = express()

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use('/api',
    graphqlHTTP({
        schema: schema,
        context: { models },
        graphiql: true
    })
)
app.use('/', (req, res, next)=> {
    res.send('<h1>You are not allowed to be here!!!</h1>')
})

app.listen(3000)