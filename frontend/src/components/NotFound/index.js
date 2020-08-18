import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation'
import './NotFound.css'

class Notfound extends Component {
    render() {
        return (
            <div id="wrap">
                <Navigation location={this.props.location}/>
                <div id="header">404 Page not found.</div>
                <div id="content">Return to <Link to="/">main page</Link></div>
            </div>
        )
    }
}

export default Notfound