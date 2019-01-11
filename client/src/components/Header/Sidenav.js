import React from 'react';
import SideNav from 'react-simple-sidenav';

import SideNavItems from './SidenavItems';

const SideDrawer = (props) => {
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={() => props.hideNav(false)}
            navStyle={{
                background: '#242424',
                maxWidth: '220px'
            }}
        >

            <SideNavItems hideNav={props.hideNav} />
        </SideNav>
    );
}

export default SideDrawer;
