import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../store/actions/user.actions';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../util/cookie.utils';




export default (Wrapped) => {


    class Auth extends Component {




        componentDidMount() {
            this.canAcccess()
        }


        async canAcccess() {
            const authToken = getCookie('auth');
            const userAndToken = !!this.props.user && !!this.props.token;
            const tokensEqual = authToken === this.props.token;


            if (userAndToken && tokensEqual) return true;

            console.log('dispatching get user');
            this.props.dispatch(Actions.getUser(authToken));
        }




        render() {
            console.log('the props in auth ', this.props);
            let view = <p>Loading auth...</p>;

            if (this.props.user === null) {

                view = <Redirect to="/login" />;
                if (this.props.match.path === '/login') view = <Wrapped {...this.props} />;

            }

            if (!!this.props.user) view = <Wrapped {...this.props} />

            return view;
        }
    }



    const mapStateToProps = ({ user: {user, token} }) => ({ user, token })



    return connect(mapStateToProps, null)(Auth)
}


