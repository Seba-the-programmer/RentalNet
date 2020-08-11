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
        allMovies(code: String): [movies!]!
        getMovie(id: Int! code: String): movies
        allUsers(code: String): [users!]!
        getUser(id: Int! code: String): users
    }

    type Mutation {
        addMovie(title: String!
            desc: String
            price: Float!
            date: String
            author: String
            url: String!
            code: String): movies

        updateMovie(id: Int!
            title: String
            desc: String
            price: Float
            date: String
            author: String
            url: String
            code: String): [Int!]

        deleteMovie(id: Int! code: String): Int!

        addUser(username: String!
            email: String!
            auth: String!
            pass: String!
            code: String): users

        updateUser(id: Int!
            username: String
            email: String
            auth: String
            pass: String
            code: String): [Int!]
        deleteUser(id: Int! code: String): Int!
    }
`