import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as auth from './authorization'
import models from '../db/models'

const generateToken = (user) =>
jwt.sign({ userId: user.id }, auth.SECRET, { expiresIn: '5d' })

export const register = async (username, email, passRaw) => {
    const isUserExist = await models.users.findOne({ where: { username } })
    if(!isUserExist) {
        var pass = await bcrypt.hash(passRaw, 10)
    }
    else {
        { throw new Error('User already exist!') }
    }

    return models.users.create({ username, email, pass })
}

export const login = async (username, pass) => {
    const user = await models.users.findOne({where: { username }})
    if(!user) { throw new Error('User not found!') }

    const valid = await bcrypt.compare(pass, user.pass)
    if(!valid) { throw new Error('Incorrect password!') }

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