import React, { Component } from 'react'
import User from '../../components/Admin';

export default class UserContainer extends Component {

    render() {
        return <User user={this.props.user} />
    }
}
