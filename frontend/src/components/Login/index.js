import React from 'react'
import './Login.css'
import { Link, Redirect} from 'react-router-dom'
import AUTHORIZATION_CODE from '../../constants'

class Login extends React.Component {
    state = {
        userValue: '',
        passValue: '',
        logged: false,
        token: ''
    }
    render() {
        const login = async() => {
            const user = this.state.userValue
            const pass = this.state.passValue

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var graphql = JSON.stringify({
            query: `mutation{loginUser(username:"${user}" pass:"${pass}" code:"${AUTHORIZATION_CODE}"){token}}`,
            variables: {}
            })
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
            };

            fetch("http://localhost:3005/api?", requestOptions)
            .then(response => response.text())
            .then(result => {
                const final = JSON.parse(result)
                if(final.data.loginUser) {
                    this.setState({token: final.data.loginUser.token})
                    this.setState({logged: true})
                }
            }
            )
            .catch(error => console.log('error', error));
        }
        const parrallax = () => {
            document.addEventListener("mousemove", parrallax)
                function parrallax(e) {
                    this.querySelectorAll('#login__form').forEach(form => {

                    const x = (window.innerWidth - e.pageX*2)/100
                    const y = (window.innerHeight - e.pageY*2)/100

                    form.style.transform = `translateX(${x}px) translateY(${y}px) skew(-20deg)`
                    })
                }
        }
        const inputUserUpdate = (event) => {
            const newValue = event.target.value
            this.setState({userValue: newValue})
        }
        const inputPassUpdate = (event) => {
            const newValue = event.target.value
            this.setState({passValue: newValue})
        }
        const userHandler = inputUserUpdate.bind(this)
        const passHandler = inputPassUpdate.bind(this)
        return (
            <div id="login__wrap" onLoad={parrallax()}>
                <div id="login__form">
                    <div id="login__content">
                        <div id="login__header">Login into your account</div>
                        <div><input type="text" placeholder="Username" value={this.state.userValue} onChange={userHandler}/></div>
                        <div><input type="password" placeholder="Password"value={this.state.passValue} onChange={passHandler}/></div>
                        <button id="login__submit" onClick={login.bind(this)}>Log in</button>
                        <div id="login__links">
                            <Link to="/emailHelp">Forgot the password?</Link><br/>
                            <Link to="/register">Don't have account yet?</Link>
                        </div>
                    </div>
                </div>
                <div id="login__title"><span id="login__title--capital">R</span>ENTAL NET</div>
                {this.state.logged && <Redirect to={`/home/${this.state.token}`}/>}
            </div>
        )
    }
}

export default Login