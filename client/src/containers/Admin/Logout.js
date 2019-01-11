import React, { Component } from 'react'
import { setCookie } from '../../util/cookie.utils';

export default class Logout extends Component {


    componentDidMount = () => {
        setCookie('auth', '', new Date().setFullYear(2017))
        setCookie('auth-refresh', '', new Date().setFullYear(2016))
        this.props.history.push('/login');
    }



    render() {
        return null;
    }
}
