import React from 'react'

const Cover = props => {
    return(
    <div className="cover"><img src={props.cover} alt="cover"/>
        <div>{props.params.title}</div>
    </div>
    )
}

export default Cover