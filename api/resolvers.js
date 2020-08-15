import * as userService from './services/user'
import authorize from './services/authorization'
import Sequelize from 'sequelize'
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $or: Op.or
}

export default{
    Query: {
        allMovies: (parent, { code }, { models }) =>
            authorize(models.movies.findAll(),code),

        getMovie: (parent, { id, code }, { models }) =>
            authorize(models.movies.findByPk(id), code),

        allUsers: (parent, { code }, { models }) =>
            authorize(models.users.findAll(), code),

        getUser: (parent, { id, code }, { models }) =>
            authorize(models.users.findByPk(id), code),

        allLogs: (parent, { code }, { models }) =>
            authorize(models.logs.findAll(), code),

        getLogs: (parent, { user, movie, action, status, code }, { models }) => {
            if(!action) action = ""
            if(!status) status = ""

            return authorize(models.logs.findAll({where: {
                user: user, movie: movie, action:{[Op.like]:`%${action}%`}, status:{[Op.like]:`%${status}%`}
            }}), code)
        },

        me: (parent, args, { models, userId }) => {
            if(userId) {
                return models.users.findOne({ where: { id: userId } })
            }
            else {
                return null
            }
        },
        results: (parent, { query }, { models }) =>
        models.movies.findAll({ where: {title:{ [Op.like]: `%${query}%` }} })
    },

    Mutation: {
        addMovie: (parent, { title, desc, price, date, author, url, code }, { models }) =>
            authorize(
                models.movies.create({ title, desc, price, date, author, url }), code
                ),

        updateMovie: (parent, { id, title, desc, price, date, author, url, code }, { models }) =>
            authorize(
                models.movies.update({ title, desc, price, date, author, url }, { where: { id } }), code
            ),

        deleteMovie: (parent, { id, code }, { models }) =>
            authorize(models.movies.destroy({ where: { id } }), code),

        addUser: (parent, { username, email, pass, code }, { models }) =>
            authorize(userService.register(username, email, pass), code),

        updateUser: (parent, { id, username, email, code }, { models }) =>
            authorize(models.users.update({ username, email}, { where: { id } }), code),

        updatePassword: (parent, { id, pass, code }, { models }) =>
            authorize(userService.update(id, pass), code),

        deleteUser: (parent, { id, code }, { models }) =>
            authorize(models.users.destroy({ where: { id } }), code),

        loginUser: (parent, { username, pass, code }, { models }) =>
            authorize(userService.login(username, pass), code),

        createLog: (parent, { user, movie, action, status, code }, { models }) =>
            authorize(models.logs.create({ user, movie, action, status }), code),

        updateLog: (parent, { id, action, status, code }, { models }) =>
            authorize(models.logs.update({ action, status }, { where: { id } }), code),

        deleteLog: (parent, { id, code }, { models }) =>
            authorize(models.logs.destroy({ where: { id } }), code),

        resent: (parent, { username, email }, { models }) =>
            userService.resent(username, email)
    }
}