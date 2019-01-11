import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom';
import SideDrawer from './Sidenav';

export default class Header extends Component {

    state = {
        showNav: false,
    }


    onNavClick = (val) => {
        this.setState({ showNav: val })
    }

    render() {
        return (
            <header>
                <div className="open_nav">
                    <FontAwesome
                        name="bars"
                        onClick={() => this.onNavClick(true)}
                        style={{
                            color: 'white',
                            padding: '10px',
                            cursor: 'pointer'
                        }}
                    />
                    <SideDrawer showNav={this.state.showNav} hideNav={this.onNavClick} />
                </div>

                <Link to="/" className="logo">
                    The local Library
                </Link>
            </header>
        )
    }
}
