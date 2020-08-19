import React, { Component } from 'react'
import './Loading.css'

class Loading extends Component {

    render() {
        return(
            <div id="loading__wrap">
                <div id="loading--out">
                    <div id="loading--center"></div>
                </div>
            </div>
        )
    }
}

export default Loading