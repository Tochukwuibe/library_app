import React from 'react';
import { Link } from 'react-router-dom';
import Fontawesome from 'react-fontawesome';
import { connect } from 'react-redux';


const SideNavItems = ({ hideNav, user }) => {
    const isAuth = !!user;
    const items = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'MyProfile',
            link: '/user',
            restricted: !isAuth
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Admins',
            link: '/user/register',
            restricted: !isAuth
        },
        {
            type: 'navItem',
            icon: 'fa-sign-in',
            text: 'Login',
            link: '/login',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'fa-sign-out',
            text: 'Logout',
            link: '/logout',
            restricted: !isAuth
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'My Reviews',
            link: '/user/user-reviews',
            restricted: !isAuth
        },
        {
            type: 'navItem',
            icon: 'file-text-o',
            text: 'Add Review',
            link: '/user/add-reviews',
            restricted: !isAuth
        },
    ]


    return (
        <div>
            {items.filter(({ restricted }) => !restricted).map((item, i) => <Element key={i} hideNav={() => hideNav(false)} item={item} />)}
        </div>
    );
}

const Element = ({ item, hideNav }) => {
    return (
        <div className={item.type} onClick={() => hideNav(false)}>
            <Link to={item.link} style={{ height: '100%', width: '100%' }}>
                <Fontawesome name={item.icon} />
                {item.text}
            </Link>
        </div>
    )
}

const mapStateToProps = ({ user: { user, token } }) => ({ user, token })


export default connect(mapStateToProps, null)(SideNavItems);
