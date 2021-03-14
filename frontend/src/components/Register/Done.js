import React, { Component } from 'react'
import './Register.css'
import Loading from '../Loading'
import { Redirect } from 'react-router-dom'
import AUTHORIZATION_CODE from '../../constants'

class Done extends Component {
    state = {
        auth: true,
        username: '',
        loading: false,
        emailValue: ''
    }

    abortController = new AbortController()

    componentDidMount() {
        const id = this.props.match.params.id
        this.setState({loading: true})
        document.body.classList.add("body--loading")

        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        let graphql = JSON.stringify({
        query: `query{getUser(id:${id} code:"${AUTHORIZATION_CODE}"){username, isConfirmed}}`,
        variables: {}
        })
        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
        }

        fetch("http://localhost:3005/api?", requestOptions, {signal: this.abortController.signal})
        .then(response => response.text())
        .then(result => {
            const final = JSON.parse(result)
            if(!final.data.getUser || final.data.getUser.isConfirmed) {
                this.setState({auth: false})
            } else {
                this.setState({username: final.data.getUser.username})
            }
        })
        .catch(error => console.log('error', error))
        document.body.classList.remove("body--loading")
        this.setState({loading: false})
    }
    componentWillUnmount() {
        this.abortController.abort()
    }
    render() {
        const auth = async () => {

        }
        const send = async () => {
            this.setState({loading: true})
            document.body.classList.add("body--loading")
            const id = this.props.match.params.id

            let myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")

            let graphql = JSON.stringify({
            query: `mutation{
                resent(username:"${this.state.username}" email:"${this.state.emailValue}")
                updateUser(id:${id} email:"${this.state.emailValue}" code:"${AUTHORIZATION_CODE}"){email}
            }`,
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
            document.body.classList.remove("body--loading")
            this.setState({loading: false})
        }
        const inputEmailUpdate = (event) => {
            const newValue = event.target.value
            this.setState({emailValue: newValue})
        }
        const emailHandler = inputEmailUpdate.bind(this)
        return (
            <div id="landing__wrap" onLoad={auth.bind(this)}>
                <div id="register__box">
                    <div id="register__content">
                        <header><p id="register__done">
                            The confirmation email has been sent into your mail address,
                            the message is avilabe for 24h.
                        </p></header>
                        <article>
                            <div>
                                <input type="email" placeholder="Retype your email" value={this.state.emailValue} onChange={emailHandler}/>
                            </div>
                            <button id="landing__submit" onClick={send.bind(this)}>Resend</button>
                        </article>
                    </div>
                </div>
                {this.state.loading && <Loading/>}
                {!this.state.auth && <Redirect to="/"/>}
            </div>
        )
    }
}

export default Done