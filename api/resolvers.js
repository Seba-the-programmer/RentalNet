export default{
    Query: {
        allMovies: (parent, args, { models }) =>
        models.movies.findAll(),
        getMovie: (parent, { id }, { models }) =>
        models.movies.findOne({ Where: { id } }),
        allUsers: (parent, args, { models }) =>
        models.users.findAll(),
        getUser: (parent, { id }, { models }) =>
        models.users.findOne({ Where: { id } })
    },

    Mutation: {
        addMovie: (parent, { title, desc, price, date, author, url }, { models }) =>
        models.movies.create({ title, desc, price, date, author, url }),
        updateMovie: (parent, { id, title, desc, price, date, author, url }, { models }) =>
        models.movies.update({ title, desc, price, date, author, url }, { Where: { id } }),
        deleteMovie: (parent, { id }, { models }) =>
        models.movies.destroy({ Where: { id } }),
        addUser: (parent, { username, email, auth, pass }, { models }) =>
        models.users.create({ username, email, auth, pass }),
        updateUser: (parent, { id, username, email, auth, pass }, { models }) =>
        models.users.update({ username, email, auth, pass }, { Where: { id } }),
        deleteUser: (parent, { id }, { models }) =>
        models.users.destroy({ Where: { id } })
    }
}