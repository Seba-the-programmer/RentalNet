import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../../public/logo.svg'
import './Navigation.css'

class Navigation extends Component {
    render() {
        const linkHandler = (path) => {
            if(this.props.token) {
                return `${path}/${this.props.token}`
            }
            else {
                return "/"
            }
        }
        const navHandler = (path) => {
            return `nav__option ${this.props.location.pathname === path ? 'active' : ''}`
        }

        return (
        <nav>
            <div id="nav__container">
                <Link to={linkHandler('/home')}><div id="nav__logo">R</div></Link>
                <div id="nav__options__box">
                    <Link to={linkHandler('/search')}>
                        <div className={navHandler(`/search//${this.props.token}`)}>SEARCH</div>
                    </Link>
                    <Link to={linkHandler('/library')}>
                        <div className={navHandler(`/library/${this.props.token}`)}>LIBRARY</div>
                    </Link>
                    <Link to={linkHandler('/account')}>
                        <div className={navHandler(`/account/${this.props.token}`)}>MY ACCOUNT</div>
                    </Link>
                    <Link to="/about">
                        <div id="nav__about" className={navHandler('/about')}>ABOUT</div>
                    </Link>
                </div>
            </div>
        </nav>
        )
    }
}

export default Navigation