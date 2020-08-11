import * as userService from './services/user'
import authorize from './services/authorization'
import { query } from 'express'

export default{
    Query: {
        allMovies: (parent, { code }, { models }) =>
        authorize(models.movies.findAll(),code),
        getMovie: (parent, { id, code }, { models }) =>
        authorize(models.movies.findByPk(id), code),
        allUsers: (parent, { code }, { models }) =>
        authorize(models.users.findAll(), code),
        getUser: (parent, { id, code }, { models }) =>
        authorize(models.users.findByPk(id), code)
    },

    Mutation: {
        addMovie: (parent, { title, desc, price, date, author, url, code }, { models }) =>
            authorize(
                models.movies.create({ title, desc, price, date, author, url }), code
                ),

        updateMovie: (parent, { id, title, desc, price, date, author, url, code }, { models }) =>
            authorize(
                models.movies.update({ title, desc, price, date, author, url }, { Where: { id } }), code
            ),

        deleteMovie: (parent, { id, code }, { models }) =>
            authorize(models.movies.destroy({ Where: { id } }), code),

        addUser: (parent, { username, email, pass, code }, { models }) =>
            authorize(userService.register(username, email, pass), code),

        updateUser: (parent, { id, username, email, pass, code }, { models }) =>
            authorize(models.users.update({ username, email, auth, pass }, { Where: { id } }), code),

        deleteUser: (parent, { id, code }, { models }) =>
            authorize(models.users.destroy({ Where: { id } }), code)
    }
}