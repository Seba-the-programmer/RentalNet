import React, { Component } from 'react'
import Loading from '../Loading'
import { Link, Redirect } from 'react-router-dom'
import './Register.css'
import AUTHORIZATION_CODE from '../../constants'

class Register extends Component {
    state = {
        userValue: '',
        passValue: '',
        passRepeat: '',
        emailValue: '',
        registered: false,
        loading: false,
        avilable: false,
        errUser: true,
        errPass: true,
        errRepeat: true,
        errEmail: true,
        errCheck: true,
        errServer: true,
        id: ''
    }
    render() {
        const register = async() => {
            await checking()
            if(this.state.avilable) {
                this.setState({loading: true})
                document.body.classList.add("body--loading")
                const user = this.state.userValue
                const pass = this.state.passValue
                const email = this.state.emailValue

                let myHeaders = new Headers()
                myHeaders.append("Content-Type", "application/json")

                let graphql = JSON.stringify({
                query: `mutation{addUser(username:"${user}" pass:"${pass}" email:"${email}" code:"${AUTHORIZATION_CODE}"){id}}`,
                variables: {}
                })
                let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: graphql,
                redirect: 'follow'
                }

                await fetch("http://localhost:3005/api?", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const final = JSON.parse(result)
                    if(final.data.addUser) {
                        this.setState({id: final.data.addUser.id})
                        this.setState({registered: true})
                    }
                    else {
                        this.setState({errServer: final.errors[0].message})
                    }
                }
                )
                .catch(error => console.log('error', error))
                document.body.classList.remove("body--loading")
                this.setState({loading: false})
            }
        }
        const checking = () => {
            if(!this.state.errPass && !this.state.errRepeat && !this.state.errEmail && !this.state.errCheck) {
                this.setState({avilable: true})
            }
            else {
                this.setState({avilable: false})
            }
        }
        const inputUserUpdate = (event) => {
            const newValue = event.target.value
            this.setState({userValue: newValue})
            if(newValue.length > 20) {
                this.setState({errUser: 'Username is too long!'})
            } else {
                this.setState({errUser: null})
            }
        }
        const inputPassUpdate = (event) => {
            const newValue = event.target.value
            this.setState({passValue: newValue})
            if(newValue.length < 8) {
                this.setState({errPass: 'Password is too short!'})
            } else {
                this.setState({errPass: null})
            }
        }
        const inputRepeatUpdate = (event) => {
            const newValue = event.target.value
            this.setState({passRepeat: newValue})
            if(newValue !== this.state.passValue) {
                this.setState({errRepeat: "Passwords doesn't match!"})
            } else {
                this.setState({errRepeat: null})
            }
        }
        const inputEmailUpdate = (event) => {
            const newValue = event.target.value
            const correctAddress = /^(([^<>()\].,;:\s@"]+(\.[^<>()\].,;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i
            this.setState({emailValue: newValue})
            const email = correctAddress.test(String(newValue).toLowerCase())
            if(!email) {
                this.setState({errEmail: 'Type a correct email!'})
            } else {
                this.setState({errEmail: null})
            }
        }
        const checkboxValidation = () => {
            const check = document.querySelector('.check')

            if(check.checked) {
                this.setState({errCheck: null})
            } else {
                this.setState({errCheck: 'You must accept terms of service!'})
            }
        }
        const userHandler = inputUserUpdate.bind(this)
        const passHandler = inputPassUpdate.bind(this)
        const repeatHandler = inputRepeatUpdate.bind(this)
        const emailHandler = inputEmailUpdate.bind(this)
        return(
            <div id="landing__wrap">
                <div id="register__box">
                    <div id="register__content">
                        <header><p>Register your account</p></header>
                        <span className="landing__err">{this.state.errServer}</span>
                        <section>
                            <div>
                                <input type="text" placeholder="Username" value={this.state.userValue} onChange={userHandler}/>
                                <span className="landing__err">{this.state.errUser}</span>
                            </div>
                            <div>
                                <input type="email" placeholder="Email" value={this.state.emailValue} onChange={emailHandler}/>
                                <span className="landing__err">{this.state.errEmail}</span>
                            </div>
                            <div>
                                <input type="password" placeholder="Password" value={this.state.passValue} onChange={passHandler}/>
                                <span className="landing__err">{this.state.errPass}</span>
                            </div>
                            <div>
                                <input type="password" placeholder="Repeat password" value={this.state.repeatValue} onChange={repeatHandler}/>
                                <span className="landing__err">{this.state.errRepeat}</span>
                            </div>
                            <label onClick={checkboxValidation}>
                                <input type="checkbox" className="check"/>
                                <div id="check__label">I accept terms of service.</div>
                                <span className="landing__err">{this.state.errCheck}</span>
                            </label>
                        </section>
                        <button id="landing__submit" onClick={register.bind(this)}>Register</button>
                        <div id="landing__links">
                            <Link to="/">Already have an account?</Link>
                        </div>
                    </div>
                </div>
                {this.state.loading && <Loading/> }
                {this.state.registered && <Redirect to={`register/done/${this.state.id}`}/>}
            </div>
        )
    }
}

export default Register