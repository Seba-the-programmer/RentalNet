import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import AUTHORIZATION_CODE from '../../constants'
import Navigation from '../Navigation'

class Home extends Component {
    state = {
        auth: true
    }
    componentDidMount() {
        let myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("auth", this.props.match.params.token)

            let graphql = JSON.stringify({
            query: `query{me{id}}`,
            variables: {}
            })
            let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
            }

            fetch("http://localhost:3005/api?", requestOptions)
            .then(response => response.text())
            .then(result => {
                const final = JSON.parse(result)
                if(!final.data.me) {
                    this.setState({auth: false})
                }
            })
    }
    render() {
        return (
            <div>
                <Navigation location={this.props.location} token={this.props.match.params.token}/>
                {!this.state.auth && <Redirect to="/"/>}
            </div>
        )
    }
}

export default Home