export default`
    type movies {
        id: Int!
        title: String!
        Desc: String
        price: Float!
        date: String
        author: String
        url: String!
    }

    type users {
        id: Int!
        username: String!
        email: String!
        auth: String!
        pass: String!
    }

    type Query {
        allMovies: [movies!]!
        getMovie(id: Int!): movies
        allUsers: [users!]!
        getUser(id: Int!): users
    }

    type Mutation {
        addMovie(title: String!
            desc: String
            price: Float!
            date: String
            author: String
            url: String!): movies
        updateMovie(id: Int!
            title: String
            desc: String
            price: Float
            date: String
            author: String
            url: String): [Int!]
        deleteMovie(id: Int!): Int!
        addUser(username: String!
            email: String!
            auth: String!
            pass: String!): users
        updateUser(id: Int!
            username: String
            email: String
            auth: String
            pass: String): [Int!]
        deleteUser(id: Int!): Int!
    }
`