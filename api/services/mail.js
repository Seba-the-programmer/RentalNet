import nodemailer from 'nodemailer'
import * as auth from './authorization'
import jwt from 'jsonwebtoken'

export const mail = async (email, username) => {
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
        html: `
                <body style="background-color: #f0d6b9;">
                    <div style="
                        align-items: center;
                        text-align: center;
                        width:100%;
                        font-size: 1.5em;
                        font-family: Arial, Helvetica, sans-serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        color:#852a37;">
                        <div style="font-size: 2em;
                        margin-top: 4vh;
                        width: auto;
                        background-color: crimson;
                        color: #f2d5d7;
                        margin-bottom:2vh;
                        padding: 10px;">Hi, ${username}!</div>
                        <div id="content">
                            It's enormous pleasure to have you in our family!<br>
                            Click button below to confirm your email and start using Rental Net website.
                        </div>
                        <a href="${url}"><button style="
                        margin-top: 3vh;
                        font-size: 1.5em;
                        cursor: pointer;
                        background-color: #f0515c;
                        color: #f2d5d7;
                        border: none;
                        border-radius: 15px;
                        padding: 5px;">Click me</button></a>
                        <div style="margin-top: 3vh;
                        color:darkgrey;
                        margin-bottom: 2vh;
                        font-size:0.8em;">This message has been generated automatically. Please don't respond to it.</div>
                    </div>
                </body>`
    }

    return transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    })
}