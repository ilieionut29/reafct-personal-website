import React from 'react'
import './styles.scss'


const Glitch = (props) => {
    const {text} = props;
    return (
        <div className="glitch" data-text={text}>{text}</div>
    )
}


export default Glitch