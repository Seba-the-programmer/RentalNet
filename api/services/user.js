import bcrypt from 'bcrypt'
import models from '../db/models'

export const register = async (username, email, auth, passRaw) => {
    const pass = await bcrypt.hash(passRaw, 10)

    return models.users.create({ username, email, auth, pass })
}