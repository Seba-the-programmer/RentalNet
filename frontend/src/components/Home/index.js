import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import AUTHORIZATION_CODE from '../../constants'
import Navigation from '../Navigation'
import Cover from '../Cover'
import './Home.css'

class Home extends Component {
    state = {
        auth: true,
        movies: []
    }

    abortController = new AbortController()

    componentDidMount() {
        let myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")
            myHeaders.append("auth", this.props.match.params.token)

            let graphql = JSON.stringify({
            query: `query{me{id}
                allMovies(code:"${AUTHORIZATION_CODE}"){id, url, price, title, desc}}`,
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
                if(!final.data.me) {
                    this.setState({auth: false})
                }
                this.setState({movies: final.data.allMovies})
            })
    }
    componentWillUnmount() {
        this.abortController.abort()
    }
    render() {
        const moviesHandler = this.state.movies.map(m => {
            const cover =  require(`../../movies${m.url}/cover.png`)
            return <Cover key={m.id} params={m} cover={cover}/>
        })
        return (
            <div>
                <Navigation location={this.props.location} token={this.props.match.params.token}/>
                <div id="home__wrap">
                    {moviesHandler}
                </div>
                {!this.state.auth && <Redirect to="/"/>}
            </div>
        )
    }
}

export default Home