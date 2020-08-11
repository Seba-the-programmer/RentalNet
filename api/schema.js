export default`
    type movies {
        id: Int!
        title: String!
        Desc: String
        price: Float!
        date: String
        author: String
        url: String!
        code: String
    }

    type users {
        id: Int!
        username: String!
        email: String!
        auth: String!
        pass: String!
        code: String
    }

    type logs {
        id: Int!
        user: Int!
        movie: Int!
        action: String!
        status: String!
        code: String
    }

    type Query {
        allMovies(code: String): [movies!]!
        getMovie(id: Int! code: String): movies
        allUsers(code: String): [users!]!
        getUser(id: Int! code: String!): users
        allLogs(code: String): [logs!]!
        getLogs(user: Int movie: Int action: String status: String code: String): [logs!]!
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
            pass: String!
            code: String): users

        updateUser(id: Int!
            username: String
            email: String
            auth: String
            pass: String
            code: String): [Int!]

        deleteUser(id: Int! code: String): Int!

        createLog(user: Int!
            movie: Int!
            action: String!
            status: String!
            code: String): logs

        updateLog(id: Int!
            action: String
            status: String
            code: String): [Int!]

        deleteLog(id: Int! code: String): Int!
    }
`