import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as auth from './authorization'
import models from '../db/models'
import { mail } from './mail'

const generateToken = (user) =>
jwt.sign({ userId: user.id }, auth.SECRET, { expiresIn: '14d' })

export const register = async (username, email, passRaw) => {
    const isUserExist = await models.users.findOne({ where: { username } })
    if(isUserExist) {
        throw new Error('User already exist!')
    }
    if(passRaw.length < 8) {
        throw new Error('Password is too short!')
    }
    if(username.length > 20) {
        throw new Error('username is too long!')
    }
    const pass = await bcrypt.hash(passRaw, 10)

    mail(email, username)

    return models.users.create({ username, email, pass })
}

export const login = async (username, pass) => {
    const user = await models.users.findOne({where: { username }})
    if(!user) { throw new Error('User not found!') }

    const valid = await bcrypt.compare(pass, user.pass)
    if(!valid) { throw new Error('Incorrect password!') }

    if(!user.isConfirmed) {
        throw new Error('Your email is not confirmed. Please check your mail.')
    }

    return {token: generateToken(user), user}
}

export const update = async (id, passRaw) => {
    const pass = await bcrypt.hash(passRaw, 10)

    return models.users.update(pass, { where: { id } })
}

export const userMiddleware = async (req) => {
    const token = req.headers.auth
    try {
        if(token) {
            const { userId } = await jwt.verify(token, auth.SECRET)
            req.userId = userId
        }
    } catch (error) {
        console.log(error)
    }

    req.next()
}

export const resent = async (username, email) => {
    mail(email, username)

    throw new Error('Mail has been sent')
}