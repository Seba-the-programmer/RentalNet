import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as auth from './authorization'
import models from '../db/models'
import nodemailer from 'nodemailer'

const generateToken = (user) =>
jwt.sign({ userId: user.id }, auth.SECRET, { expiresIn: '14d' })

export const register = async (username, email, passRaw) => {
    const isUserExist = await models.users.findOne({ where: { username } })
    if(isUserExist) {
        throw new Error('User already exist!')
    }
    const pass = await bcrypt.hash(passRaw, 10)

    const etoken = await jwt.sign({ name: username }, auth.SECRET, {expiresIn: '1d'})
    const url = `http://localhost:3005/confirmation/${etoken}`

    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
        user: 'rentalNetNoReply@gmail.com',
        pass: auth.AUTHORIZATION_CODE
        }
    })

    const message = {
        from: 'rentalNetNoReply@gmail.com',
        to: email,
        subject: 'Confirm your email',
        html: `Click link to confirm your email => <a href="${url}">Link</a>`
    }
    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    })

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