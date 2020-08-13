import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as auth from './authorization'
import Sequelize from 'sequelize'
import models from '../db/models'

const generateToken = (user) =>
jwt.sign({ userId: user.id }, auth.SECRET, { expiresIn: '5d' })

export const register = async (username, email, passRaw) => {
    const pass = await bcrypt.hash(passRaw, 10)

    return models.users.create({ username, email, pass })
}

export const login = async (username, pass) => {
    const user = await models.users.findOne({where: { username: username }})
    if(!user) { throw new Error('User not found!') }

    const valid = await bcrypt.compare(pass, user.pass)
    if(!valid) { throw new Error('Incorrect password!') }

    return {token: generateToken(user), user}
}