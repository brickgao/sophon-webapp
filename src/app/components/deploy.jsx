import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'


class Deploy extends React.Component {
    render() {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Deploy
