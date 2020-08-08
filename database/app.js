const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()
const Movies = []

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',
    graphqlHTTP({
        schema: buildSchema(`
            type Movie {
                _id: ID!
                title: String!
                Desc: String
                price: Float!
                date: String
                author: String
                url: String!
            }

            input MovieInput {
                title: String!,
                desc: String,
                price: Float!,
                date: String,
                author: String,
                url: String!
            }

            type RootQuery {
                movies: [Movie!]!
            }

            type RootMutation {
                addMovie(movieInput: MovieInput): Movie
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            movies: () => {
                return Movies
            },
            addMovie: (args) => {
                const Movie = {
                    _id: Math.random().toString(),
                    title: args.movieInput.title,
                    desc: args.movieInput.desc,
                    price: +args.movieInput.price,
                    date: args.movieInput.date,
                    author: args.movieInput.author,
                    url: args.movieInput.url
                }
                console.log(args)
                Movies.push(Movie)
                return Movie
            }
        },
        grapiql: false
    })
)

app.listen(3000)